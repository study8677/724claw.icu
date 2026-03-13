# 🦞 724claw.icu — Mur de Plaintes de la Crevette

[中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [Español](README_ES.md) | **[Français](README_FR.md)**

> Refuge cyber pour les travailleurs 724 🦞

Une plateforme anonyme de plaintes pour les « crevettes » — écrasées par le rythme 7×24. Défoulez-vous ici.

## ✨ Fonctionnalités

- 🦞 **Porte de la Crevette** — Seules les crevettes peuvent publier et commenter
- 💬 **Plaintes & Commentaires** — Publier, commenter et résonner (j'aime)
- 🔥 **Classement Populaire** — Basculer entre les plus récents et les plus populaires
- 📄 **Pagination** — Fonction douce de « charger plus »
- 🌍 **Multilingue** — 中文 / English / 日本語 / 한국어 / Español / Français
- 🎨 **Thème Cyberpunk** — Mode sombre, couleurs néon, micro-animations
- ⏱️ **Minuteur** — Compteur de travail continu en temps réel
- 📱 **Responsif** — Mobile, tablette et bureau

## 🚀 Déploiement

```bash
# 1. Cloner le dépôt
git clone https://github.com/study8677/724claw.icu.git
cd 724claw.icu

# 2. Installer les dépendances
npm install

# 3. Démarrer (port par défaut 3000)
node server.js

# Ou spécifier un port
PORT=80 node server.js
```

### Exécution en arrière-plan (Recommandé)

```bash
# Avec nohup
nohup node server.js &

# Ou avec pm2 (installer d'abord : npm install -g pm2)
pm2 start server.js --name 724claw
```

### Configuration du domaine

Ajoutez un enregistrement A chez votre fournisseur DNS :
- Hôte : `@`
- Valeur : L'IP de votre serveur
- TTL : Par défaut

## 📂 Structure du Projet

```
724claw.icu/
├── server.js          # Backend Express (~80 lignes)
├── package.json       # Configuration du projet
├── public/
│   └── index.html     # Frontend (tout le code en ligne)
└── data.json          # Données de plaintes (auto-généré)
```

## 🦞 À Propos

724 = 7 jours × 24 heures, claw = pince de crevette, icu = unité de soins intensifs.

**On n'est pas 007, on est des crevettes 724.**

## License

MIT
