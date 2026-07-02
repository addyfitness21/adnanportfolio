import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { 
  defaultSettings,
  defaultHomeData,
  defaultPersonalData,
  defaultBusinessData,
  defaultAboutData,
  defaultBlogsData
} from "../../utils/db";

// Create Neon database client
const sql = neon(process.env.DATABASE_URL);

// Helper to initialize table and seed it if needed
async function initDb() {
  // Create table
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_settings (
      key VARCHAR(50) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Seed default items if they are missing
  const checkSettings = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'settings'`;
  if (checkSettings.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('settings', ${JSON.stringify(defaultSettings)})`;
  }

  const checkHome = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'home'`;
  if (checkHome.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('home', ${JSON.stringify(defaultHomeData)})`;
  }

  const checkPersonal = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'personal'`;
  if (checkPersonal.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('personal', ${JSON.stringify(defaultPersonalData)})`;
  }

  const checkBusiness = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'business'`;
  if (checkBusiness.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('business', ${JSON.stringify(defaultBusinessData)})`;
  }

  const checkAbout = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'about'`;
  if (checkAbout.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('about', ${JSON.stringify(defaultAboutData)})`;
  }

  const checkBlogs = await sql`SELECT 1 FROM portfolio_settings WHERE key = 'blogs'`;
  if (checkBlogs.length === 0) {
    await sql`INSERT INTO portfolio_settings (key, value) VALUES ('blogs', ${JSON.stringify(defaultBlogsData)})`;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    
    if (!type) {
      return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
    }

    // Ensure database is initialized
    await initDb();

    // Query Neon database
    const results = await sql`SELECT value FROM portfolio_settings WHERE key = ${type}`;
    
    if (results.length > 0) {
      return NextResponse.json(results[0].value);
    }

    // Default fallback if query finds nothing
    let fallback = {};
    if (type === "settings") fallback = defaultSettings;
    else if (type === "home") fallback = defaultHomeData;
    else if (type === "personal") fallback = defaultPersonalData;
    else if (type === "business") fallback = defaultBusinessData;
    else if (type === "about") fallback = defaultAboutData;
    else if (type === "blogs") fallback = defaultBlogsData;

    return NextResponse.json(fallback);
  } catch (error) {
    console.error("GET DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type, data } = await request.json();
    
    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data parameters" }, { status: 400 });
    }

    // Ensure database is initialized
    await initDb();

    // Save/Upsert Neon database
    await sql`
      INSERT INTO portfolio_settings (key, value, updated_at) 
      VALUES (${type}, ${JSON.stringify(data)}, CURRENT_TIMESTAMP)
      ON CONFLICT (key) 
      DO UPDATE SET value = ${JSON.stringify(data)}, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
