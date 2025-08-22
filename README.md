# 🗺️ Service Finder – Team 3: Service Details & Info Windows
## 📌 Project Overview

Service Finder is a web application developed by LC Studio to help users locate nearby public services such as clinics, libraries, and shelters. It uses the Google Maps API to display service locations on an interactive map. Team 3 is responsible for designing and implementing the service details interface — including info cards, side panels, and backend integration — to ensure users can easily access accurate and helpful information about each service.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🎯 Team 3 Scope & Responsibilities

This repository tracks the progress and implementation of Team 3’s deliverables:

| Date       | Ticket Title                                  | Team            | Responsibilities |
|------------|-----------------------------------------------|------------------|------------------|
| 08/25/2025 | Service Details Requirements Gathering         | UI/UX + Stakeholders | Define fields, choose display method, document schema/API needs |
| 08/26/2025 | Info Card Wireframe                            | UI/UX Team       | Design low-fidelity layout, review with frontend |
| 08/26/2025 | Side Panel Wireframe                           | UI/UX Team       | Create layout for detailed view, add action buttons |
| 08/27/2025 | High-Fidelity Info Card Mockup                 | UI/UX Team       | Apply branding, define breakpoints, deliver final assets |
| 08/28/2025 | Schema Extension – Service Hours & Contact     | Database Team    | Add new fields, run migration, update ERD |
| 08/28/2025 | Backend API – Get Service by ID                | Backend Team     | Build `/api/service/:id` endpoint, return structured JSON |
| 08/29/2025 | Frontend Component – Info Card                 | Frontend Team    | Build reusable UI component, apply styling from mockups |
| 08/29/2025 | Frontend Component – Side Panel                | Frontend Team    | Implement panel behavior, support long descriptions |
| 08/30/2025 | Marker Click → Display Info                    | Frontend Team    | Connect marker clicks to API, render info card/panel |
| 08/30/2025 | Styling & UX Refinements                       | UI/UX + Frontend | Add icons, polish responsiveness, final UX tweaks |
| 08/31/2025 | QA – Info Window Data Validation               | QA Team          | Validate displayed data vs. DB, test formatting |
| 09/01/2025 | QA – Cross-Device Testing                      | QA Team          | Test across devices, validate gestures and map stability |

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** Firebase Firestore (mock DB)
- **Authentication:** Firebase Auth
- **Maps Integration:** Google Maps API
- **Version Control:** Git + GitHub
- **Testing Tools:** Postman, manual QA
- 
----------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Deployment Goals

- Fully responsive UI across desktop, tablet, and mobile
- Smooth integration with Google Maps API
- Fast-loading service details with accurate data
- Live deployment on GitHub Pages, Vercel, or Netlify

------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ✅ Success Criteria

- Interactive map with filterable service markers
- Info cards and side panels display complete service details
- Secure user login and service suggestion functionality
- Seamless UX across devices and screen sizes

