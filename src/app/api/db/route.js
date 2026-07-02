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

// Connect to Neon
const sql = neon(process.env.DATABASE_URL);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    
    if (!type) {
      return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
    }

    if (type === "settings") {
      const rows = await sql`SELECT email, password FROM admin_settings LIMIT 1`;
      return NextResponse.json(rows[0] || defaultSettings);
    } 
    
    if (type === "home") {
      const rows = await sql`SELECT hero_image, heading_title, animated_words, stack_items FROM home_config LIMIT 1`;
      if (rows[0]) {
        return NextResponse.json({
          heroImage: rows[0].hero_image,
          headingTitle: rows[0].heading_title,
          animatedWords: rows[0].animated_words,
          stackItems: rows[0].stack_items
        });
      }
      return NextResponse.json(defaultHomeData);
    } 
    
    if (type === "personal") {
      const profile = await sql`SELECT title, icon, description, category FROM personal_profile ORDER BY id ASC`;
      const career = await sql`SELECT id, title, company, period, description, color, boxes, tags FROM career_journey ORDER BY id ASC`;
      const competencies = await sql`SELECT name, value, category FROM core_competencies ORDER BY id ASC`;
      const edu = await sql`SELECT degree, school, period, details FROM education_background ORDER BY id ASC`;
      
      return NextResponse.json({
        professionalProfile: profile,
        careerJourney: career.map(c => ({
          id: c.id,
          title: c.title,
          company: c.company,
          period: c.period,
          description: c.description,
          color: c.color,
          boxes: c.boxes,
          tags: c.tags
        })),
        coreCompetencies: competencies,
        education: edu
      });
    } 
    
    if (type === "business") {
      const ventures = await sql`SELECT id, name, tagline, role, description, points, logo_bg, logo_icon FROM business_ventures ORDER BY id ASC`;
      return NextResponse.json({
        ventures: ventures.map(v => ({
          id: v.id,
          name: v.name,
          tagline: v.tagline,
          role: v.role,
          description: v.description,
          points: v.points,
          logoBg: v.logo_bg,
          logoIcon: v.logo_icon
        }))
      });
    } 
    
    if (type === "about") {
      const chapters = await sql`SELECT chapter_number, title, paragraphs FROM about_chapters ORDER BY id ASC`;
      return NextResponse.json({
        chapters: chapters.map(ch => ({
          chapterNumber: ch.chapter_number,
          title: ch.title,
          paragraphs: ch.paragraphs
        }))
      });
    } 
    
    if (type === "blogs") {
      const posts = await sql`SELECT id, image, overlay_title, tags, title, excerpt, date, read_time, category, body, solution FROM blog_posts ORDER BY id ASC`;
      return NextResponse.json(posts.map(b => ({
        id: b.id,
        image: b.image,
        overlayTitle: b.overlay_title,
        tags: b.tags,
        title: b.title,
        excerpt: b.excerpt,
        date: b.date,
        readTime: b.read_time,
        category: b.category,
        body: b.body,
        solution: b.solution
      })));
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
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

    if (type === "settings") {
      await sql`DELETE FROM admin_settings`;
      await sql`INSERT INTO admin_settings (email, password) VALUES (${data.email}, ${data.password})`;
      return NextResponse.json({ success: true });
    }

    if (type === "home") {
      await sql`DELETE FROM home_config`;
      await sql`INSERT INTO home_config (hero_image, heading_title, animated_words, stack_items) 
                VALUES (${data.heroImage}, ${data.headingTitle}, ${data.animatedWords}, ${JSON.stringify(data.stackItems)})`;
      return NextResponse.json({ success: true });
    }

    if (type === "personal") {
      await sql`DELETE FROM personal_profile`;
      for (const item of data.professionalProfile) {
        await sql`INSERT INTO personal_profile (title, icon, description, category) VALUES (${item.title}, ${item.icon}, ${item.description}, ${item.category})`;
      }

      await sql`DELETE FROM career_journey`;
      for (const milestone of data.careerJourney) {
        await sql`INSERT INTO career_journey (title, company, period, description, color, boxes, tags) 
                  VALUES (${milestone.title}, ${milestone.company}, ${milestone.period}, ${milestone.description}, ${milestone.color}, ${JSON.stringify(milestone.boxes)}, ${milestone.tags || []})`;
      }

      await sql`DELETE FROM core_competencies`;
      for (const comp of data.coreCompetencies) {
        await sql`INSERT INTO core_competencies (name, value, category) VALUES (${comp.name}, ${comp.value}, ${comp.category})`;
      }

      await sql`DELETE FROM education_background`;
      for (const edu of data.education) {
        await sql`INSERT INTO education_background (degree, school, period, details) VALUES (${edu.degree}, ${edu.school}, ${edu.period || ""}, ${edu.details})`;
      }

      return NextResponse.json({ success: true });
    }

    if (type === "business") {
      await sql`DELETE FROM business_ventures`;
      for (const v of data.ventures) {
        await sql`INSERT INTO business_ventures (name, tagline, role, description, points, logo_bg, logo_icon) 
                  VALUES (${v.name}, ${v.tagline}, ${v.role}, ${v.description}, ${v.points}, ${v.logoBg}, ${v.logoIcon})`;
      }
      return NextResponse.json({ success: true });
    }

    if (type === "about") {
      await sql`DELETE FROM about_chapters`;
      for (const ch of data.chapters) {
        await sql`INSERT INTO about_chapters (chapter_number, title, paragraphs) VALUES (${ch.chapterNumber}, ${ch.title}, ${ch.paragraphs})`;
      }
      return NextResponse.json({ success: true });
    }

    if (type === "blogs") {
      await sql`DELETE FROM blog_posts`;
      for (const b of data) {
        await sql`INSERT INTO blog_posts (image, overlay_title, tags, title, excerpt, date, read_time, category, body, solution) 
                  VALUES (${b.image}, ${b.overlayTitle}, ${b.tags}, ${b.title}, ${b.excerpt}, ${b.date}, ${b.readTime}, ${b.category}, ${b.body}, ${b.solution})`;
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("POST DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
