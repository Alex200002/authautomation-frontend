import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir dashboard
app.use("/dashboard", express.static(path.join(__dirname, "../dashboard")));
