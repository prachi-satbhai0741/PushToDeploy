# PushToDeploy

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

Automated CI/CD pipeline — push code to GitHub, app deploys itself on AWS using Docker, Terraform, and GitHub Actions. Zero manual steps.

---

## What It Does

A single `git push` triggers the entire deployment lifecycle automatically.

```
Developer pushes code to GitHub
             |
             v
   GitHub Actions triggers pipeline
             |
             v
       Tests run
             |
             v
  Docker builds and pushes image to DockerHub
             |
             v
  Terraform provisions AWS EC2 + Security Group + Elastic IP
             |
             v
       EC2 pulls Docker image
             |
             v
     Nginx reverse proxy serves the app
             |
             v
        App is live on AWS public IP
```

---

## Tech Stack

| Layer          | Technology         |
|----------------|--------------------|
| Application    | Node.js REST API   |
| Containerization | Docker + Docker Compose |
| CI/CD          | GitHub Actions     |
| Infrastructure | Terraform          |
| Cloud          | AWS EC2, S3, IAM, Security Groups |
| Proxy          | Nginx              |

---

## Project Structure

```
PushToDeploy/
├── app/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── provider.tf
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
```
---

## Prerequisites

- AWS account with free tier access
- DockerHub account
- Terraform installed locally
- GitHub repository secrets configured:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret key |
| `DOCKERHUB_USERNAME` | DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `EC2_SSH_KEY` | Private key for EC2 SSH access |

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/prachi-satbhai0741/PushToDeploy.git
cd PushToDeploy

# Run locally with Docker Compose
docker-compose up --build

# App runs at http://localhost:3000
```

---

## Infrastructure

Terraform manages all AWS resources. State is stored remotely in S3.

```bash
cd terraform

# Initialize
terraform init

# Preview changes
terraform plan

# Apply
terraform apply

# Destroy when done
terraform destroy
```

---

## How Deployment Works

1. Push code to the `main` branch
2. GitHub Actions workflow triggers automatically
3. Tests run — pipeline halts if any test fails
4. Docker image is built and pushed to DockerHub
5. Terraform provisions or updates AWS infrastructure
6. EC2 instance pulls the new image and restarts the container
7. App is live at the EC2 Elastic IP on port 80
---
## License

MIT License. See [LICENSE](LICENSE) for details.
