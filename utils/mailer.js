import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import mime from "mime-types";

dotenv.config();

// Cache for email templates to avoid redundant file reads
const templateCache = new Map();

// Reusable Nodemailer transporter (connection pooling & keep-alive)
let transporter;

async function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return transporter;
}

// Function to load and cache email templates
async function loadEmailTemplate(templateName) {
  if (templateCache.has(templateName)) return templateCache.get(templateName);

  try {
    const templatePath = path.resolve("templates", `${templateName}.html`);
    const templateContent = await fs.readFile(templatePath, "utf8");
    templateCache.set(templateName, templateContent); // Cache the template
    return templateContent;
  } catch (error) {
    console.error(
      `❌ Error loading template "${templateName}":`,
      error.message
    );
    throw new Error(`Email template "${templateName}" not found.`);
  }
}

// Function to replace placeholders with actual values (HTML-safe)
function replaceTemplateVariables(template, variables) {
  return Object.entries(variables).reduce(
    (emailTemplate, [key, value]) =>
      emailTemplate.replaceAll(`{{${key}}}`, value),
    template
  );
}

// Function to validate and format attachments
function processAttachments(attachments = []) {
  return attachments.map((attachment) => ({
    filename: path.basename(attachment.path),
    path: attachment.path,
    contentType: mime.lookup(attachment.path) || "application/octet-stream", // Ensure safe MIME types
  }));
}

// Reusable sendMail function
export async function sendMail({
  to,
  subject,
  templateName,
  variables,
  attachments = [],
}) {
  console.log("==========70==============");
  try {
    if (!to || !subject || !templateName || !variables) {
      throw new Error(
        "Missing required parameters: 'to', 'subject', 'templateName', or 'variables'."
      );
    }

    // Load email template
    let emailTemplate = await loadEmailTemplate(templateName);
    emailTemplate = replaceTemplateVariables(emailTemplate, variables);

    // Get transporter
    const transporter = await getTransporter();

    // Validate and process attachments
    const formattedAttachments = processAttachments(attachments);

    // Send email
    const info = await transporter.sendMail({
      from: `"Early Tech" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html: emailTemplate,
      attachments: formattedAttachments,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`📨 Email sent successfully to ${to}:`, info.messageId);
    }

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return {
      success: false,
      message: "Email sending failed",
      error: error.message,
    };
  }
}

export async function sendReplyMail({
  to,
  subject,
  template,
  attachments = [],
}) {
  console.log("==========70==============");
  try {
    if (!to || !subject || !template ) {
      throw new Error(
        "Missing required parameters: 'to', 'subject', 'templateName', or 'variables'."
      );
    }

    // Get transporter
    const transporter = await getTransporter();

    // Validate and process attachments
    const formattedAttachments = processAttachments(attachments);

    // Send email
    const info = await transporter.sendMail({
      from: `"Early Tech" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html: template,
      attachments: formattedAttachments,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`📨 Email sent successfully to ${to}:`, info.messageId);
    }

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return {
      success: false,
      message: "Email sending failed",
      error: error.message,
    };
  }
}
