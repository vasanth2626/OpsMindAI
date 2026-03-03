# OpsMind AI – Context-Aware Corporate Knowledge Assistant

OpsMind AI is an enterprise-grade RAG (Retrieval-Augmented Generation) platform that lets employees and admins instantly search, chat, and retrieve answers from internal company documents (PDFs, policies, handbooks) with zero hallucination and full citation. Built with Node.js, React, MongoDB Atlas Vector Search, and MiniLM/Gemini/Groq LLMs.

---

## 🚀 Features

- **PDF Upload & Ingestion:** Upload any text-based PDF, auto-chunk, embed, and store in vector DB.
- **Semantic Search & Chat:** Employees can ask questions and get answers with citations, only from indexed docs.
- **Hallucination Guard:** If answer not found, system refuses to guess (“I don’t know”).
- **Admin Dashboard:** View analytics, quick log stats, top queries, document list, and user management.
- **Employee CRUD:** Superadmin/admin can add, edit, delete employees and admins.
- **Profile Management:** Users can update profile, change password, upload avatar.
- **System Logs:** All actions (profile, employee, document) are logged and viewable by superadmin.
- **Onboarding Email:** New users get an email with their credentials and who created them.
- **Role-based Access:** Superadmin, admin, employee – all with different permissions.
- **Dark SaaS UI:** Modern, responsive, and mobile-friendly.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Recharts, Lucide Icons
- **Backend:** Node.js, Express, MongoDB Atlas, MiniLM (Xenova), Gemini/Groq/OpenRouter LLMs, Nodemailer
- **Vector Search:** MongoDB Atlas Vector Search
- **Deployment:** Vercel (frontend), Render/Railway (backend), MongoDB Atlas (cloud DB)

---

## 🖥️ How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/opsmind-ai.git
   cd opsmind-ai