import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI Travel Assistant
  app.post("/api/plan-itinerary", async (req: any, res: any) => {
    try {
      const { destination, duration, style, travelers } = req.body;

      if (!destination || !duration) {
        return res.status(400).json({ error: "El destino y la duración son obligatorios." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "Clave de API de Gemini no configurada. Por favor, agréguela en el panel de configuración de secretos de AI Studio." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Actúa como el Asistente Experto en Planificación de Viajes de 'Sisari Travel', la mejor agencia de turismo en Ayacucho y Perú con más de 10 años de experiencia.
Crea un itinerario de viaje personalizado exclusivo para:
- Destino: ${destination}
- Duración: ${duration} días
- Estilo del viaje: ${style} (ej. aventura, familiar, relajante, cultural, etc.)
- Viajeros: ${travelers}

Debes estructurar tu respuesta con la información más atractiva, real y mística posible del lugar, optimizando los tiempos de traslado, recomendando comidas típicas y tips de seguridad útiles. El itinerario debe ser de exactamente ${duration} días.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Eres un planificador de viajes experto de la agencia de turismo Sisari Travel. Tu objetivo es proponer rutas turísticas espectaculares. Ofrece un tono muy amable, andino y alegre, pero profesional. Las recomendaciones de equipaje y presupuesto deben ser prácticas de acuerdo al destino.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              destination: { 
                type: Type.STRING,
                description: "Nombre formateado del destino"
              },
              durationDays: { 
                type: Type.INTEGER,
                description: "Duración en días"
              },
              travelStyle: { 
                type: Type.STRING,
                description: "Estilo seleccionado de viaje"
              },
              overview: { 
                type: Type.STRING,
                description: "Breve resumen motivador del viaje, destacando la experiencia de Sisari Travel"
              },
              budgetCategory: { 
                type: Type.STRING,
                description: "Descripción estimada del presupuesto aconsejado y clima sugerido"
              },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING, description: "Ej. Explorando las Ruinas de Wari" },
                    details: { type: Type.STRING, description: "Actividades paso a paso en español" },
                    recommendations: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Consejos exclusivos, comidas recomendadas o tips de foto para ese día"
                    }
                  },
                  required: ["day", "title", "details", "recommendations"]
                }
              },
              packingSuggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Recomendaciones esenciales para llevar en la mochila"
              }
            },
            required: ["destination", "durationDays", "travelStyle", "overview", "days", "budgetCategory", "packingSuggestions"]
          }
        }
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error("No se obtuvo respuesta del servicio de inteligencia artificial.");
      }

      const parsedData = JSON.parse(rawText.trim());
      res.json(parsedData);

    } catch (err: any) {
      console.error("Error generating itinerary:", err);
      res.status(500).json({ error: err.message || "Error al procesar el itinerario con IA." });
    }
  });

  // Serve static UI or Vite development tools
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sisari Travel server running on port ${PORT}`);
  });
}

startServer();
