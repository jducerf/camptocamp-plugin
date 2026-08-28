# Camptocamp Outdoor Agent Plugin

Ce dépôt fournit un plugin portable en lecture seule pour assistants et agents compatibles avec le format Agent Plugins. Il apporte une méthode de recherche et de préparation outdoor autour de Camptocamp.

**Prérequis : installez d’abord votre propre MCP Camptocamp.** Le plugin ne contient pas le serveur MCP et ne se connecte à aucun serveur personnel préconfiguré. C’est volontaire : chaque utilisateur conserve son installation, son hébergement et ses données de connexion.

## Contenu

- `plugin.json` : manifeste portable Agent Plugins ;
- `skills/camptocamp/SKILL.md` : méthode de recherche et de préparation outdoor ;
- `assets/ctc.png` : logo Camptocamp.

Le fichier `mcp.json` n’est pas inclus dans ce dépôt. Dans un Agent Plugin, ce fichier sert à déclarer un serveur MCP réellement lançable par le client. Or le MCP Camptocamp est installé et construit par chaque utilisateur : son chemin local ou son endpoint distant lui appartient. Ajouter ici une configuration pointant vers notre VPS serait trompeur et empêcherait une installation communautaire correcte.

## 1. Installer votre MCP Camptocamp

Clonez et construisez le MCP depuis son dépôt officiel communautaire :

```bash
git clone https://github.com/jducerf/mcp-camptocamp.git
cd mcp-camptocamp
npm ci
npm run build
```

Le serveur local est alors disponible dans `dist/index.js`.

Pour un client local (stdio), configurez le MCP avec l’exécutable `node` et le chemin absolu vers ce fichier :

```json
{
  "command": "node",
  "args": ["/chemin/absolu/vers/mcp-camptocamp/dist/index.js"]
}
```

Pour ChatGPT Web ou tout client distant, hébergez votre propre endpoint MCP en Streamable HTTP, puis connectez **votre URL** dans le client. Le dépôt MCP décrit les modalités de déploiement ; aucune URL du mainteneur n’est imposée par ce plugin.

## 2. Installer ce plugin

Une fois le MCP disponible dans votre client, installez ce dépôt comme Agent Plugin depuis son dépôt Git ou son dossier local. Le skill `skills/camptocamp/SKILL.md` sera alors chargé avec le plugin.

## Desktop et Web : retour d’expérience

### Desktop / Codex

Installez le dépôt comme plugin depuis un dossier local ou une marketplace Git. Ajoutez ensuite votre MCP local en stdio dans le client. Le plugin et le serveur MCP restent deux composants séparés et remplaçables.

### ChatGPT Web

Connectez d’abord votre propre endpoint MCP Camptocamp dans ChatGPT, puis installez le plugin/skill selon les capacités de votre espace de travail. Le skill est conçu pour s’activer lorsque le MCP Camptocamp est présent dans la conversation. Sur le Web, les skills sont utilisés en mode **Work** ; ils ne sont pas appelés en mode **Chat**.

L’URL du VPS héberge les fichiers, mais n’est pas une URL d’installation universelle. Une publication Workspace ou dans le répertoire public dépend des permissions, du type de compte et du processus OpenAI correspondant.

## Référence du format

- [Manifest `plugin.json`](https://agent-plugins.org/plugin-authors/manifest)
- [Déclaration des serveurs MCP](https://agent-plugins.org/plugin-authors/mcp-servers)
- [Skills](https://agent-plugins.org/plugin-authors/skills)

## Sécurité et limites

Le MCP recommandé est public et read-only. Le plugin ne crée, ne modifie et ne supprime aucun contenu Camptocamp. Les conditions, la météo, la nivologie, les accès et la sécurité doivent être vérifiés avec des sources actuelles et sur le terrain.

## Licence

MIT. Voir `LICENSE`.
