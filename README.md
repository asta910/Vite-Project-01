
![Untitled Diagram drawio (6)](https://github.com/user-attachments/assets/0d8be988-a63a-4d67-99fc-66c124c9dbf0)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Cert-manager 
kubectl apply -fhttps://github.com/cert-manager/cert-manager/releases/download/v1.15.3/cert-manager.yaml

# nginx ingress controller for Azure
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml

# istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.23.2
export PATH=$PWD/bin:$PATH


# Clone repository on Azure Devops platform
Establish a connection between ACR and Azure DevOps build CI pipelines .

# For a VM using terraform
refer to another repo from my profile named terrform clone it and by doing so create a VM ,download Azure pipelines on that VM establish a connection between VM and azure DevOPs platform.
