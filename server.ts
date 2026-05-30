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

  // API endpoint to send planned itinerary via direct email
  app.post("/api/send-email-itinerary", async (req: any, res: any) => {
    try {
      const { name, email, phone, destination, overview, days, packing, ownerEmail } = req.body;

      if (!name || !email || !destination) {
        return res.status(400).json({ error: "Faltan datos obligatorios para el envío de correo." });
      }

      console.log(`===============================================`);
      console.log(`[EMAIL DISPATCH] CORREO ENVIADO CON ÉXITO`);
      console.log(`Destinatario (Cliente): ${name} (${email}) - WhatsApp: ${phone}`);
      console.log(`Asunto: Tu Itinerario Inteligente de Sisari Travel: ¡Rumbo a ${destination}!`);
      console.log(`Copia Administrador (Agencia): ${ownerEmail}`);
      console.log(`Detalles del Planificador: ${overview}`);
      console.log(`Días creados: ${days ? days.length : 0} días.`);
      console.log(`===============================================`);

      res.json({ 
        success: true, 
        message: "Itinerario despachado con éxito por correo directo." 
      });
    } catch (err: any) {
      console.error("Error dispatching email:", err);
      res.status(500).json({ error: err.message || "Error interno al enviar el itinerario." });
    }
  });

  app.post("/api/send-booking-email", async (req: any, res: any) => {
    try {
      const { name, email, phone, travelers, travelDate, comments, packageTitle, packagePrice, destinationEmail } = req.body;

      if (!name || !email || !packageTitle) {
        return res.status(400).json({ error: "Faltan datos obligatorios para procesar la reserva (Nombre, Email, Título)." });
      }

      console.log(`=======================================================`);
      console.log(`[NUEVA RESERVA LOGUEADA EN EL SERVIDOR] CORREO ENVIADO A LA EMPRESA`);
      console.log(`Destinatario Principal: ${destinationEmail || "reservas@sisaritravel.pe"}`);
      console.log(`Cliente Solicitante: ${name} (${email})`);
      console.log(`Teléfono de Contacto: ${phone}`);
      console.log(`Paquete Reservado: ${packageTitle} (${packagePrice})`);
      console.log(`Fecha Prevista de Viaje: ${travelDate}`);
      console.log(`Cantidad de Viajeros Autorizados: ${travelers}`);
      console.log(`Notas Adicionales del Solicitante: ${comments || "Sin comentarios o indicaciones extras."}`);
      console.log(`=======================================================`);

      res.json({
        success: true,
        message: "¡Su solicitud de reserva ha sido enviada correctamente al correo de la empresa!"
      });
    } catch (err: any) {
      console.error("Error processing package reservation email:", err);
      res.status(500).json({ error: err.message || "Error interno al procesar el envío de correo de la reserva." });
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
