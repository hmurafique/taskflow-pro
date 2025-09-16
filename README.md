# TaskFlow Pro — Full Developer → DevOps Deployment Guide

**TaskFlow Pro** is a small but realistic task-management application used to practice end-to-end DevOps: developer-only code push, DevOps containerization and deployment. This guide contains everything from the developer code layout to production deployment (without domain and with domain + SSL).

---

## What’s included
- Backend: Node.js, Express, MongoDB, JWT auth (register/login) and task CRUD.
- Frontend: React (Vite) simple UI (login, register, dashboard).
- DevOps: Dockerfiles, docker-compose, containerized Nginx + Certbot (optional).
- Full step-by-step instructions for both deployment variants.

---

## Quick start — Developer
1. Implement backend code under `backend/` (already provided).
2. Implement frontend code under `frontend/` (already provided).
3. Commit and push to GitHub (developer should not add Dockerfiles; DevOps will add them).

---

## Quick start — DevOps (Version 1: Without domain)
1. SSH into server (Ubuntu EC2).
2. Install Docker & Docker Compose.
3. Clone repo:
   ```bash
   git clone <REPO_URL>
   cd taskflow-pro
```

---

## Create backend Environment File
cp backend/.env.example backend/.env.local

---

## Creating Dockerfiles & docker-compose.yml Files
1. backend/Dockerfile and frontend/Dockerfile.
2. docker-compose.yml File.

---

## Start Stack:
- docker-compose up -d --build

---

## Verify
- Visit http://<SERVER_IP>:3000 for **Frontend** and http://<SERVER_IP>:5000/api for **Backend**.

---

## Version 2: With domain + SSL
- Two options:
## Option A — Recommended (Host Nginx + Certbot)
- Use **host Nginx** and **Certbot** to **reverse-proxy** to **Docker services**. (Simpler on single VM.)
- Add an **Nginx** site file for **your.domain.com** that proxies /api/ to **http://127.0.0.1:5000** and / to **http://127.0.0.1:3000**.
- Run sudo certbot --nginx -d your.domain.com to obtain certificates; reload Nginx.

---

## Option B — Advanced (Containerized Nginx + Certbot)
- Use docker-compose.yml with nginx and certbot containers and mount ./certbot/conf and ./certbot/www.
- Run: 
``` bash
docker-compose up -d --build
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d your.domain.com --email you@example.com --agree-tos --no-eff-email
docker-compose restart nginx
```

- Access the app at https://your.domain.com.

---



