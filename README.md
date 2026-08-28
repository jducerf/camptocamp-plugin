# Camptocamp Outdoor Agent Plugin

Ce dépôt fournit un plugin portable en lecture seule pour assistants et agents compatibles avec le format Agent Plugins. Il apporte une méthode de recherche et de préparation outdoor autour de Camptocamp et embarque une copie construite du MCP nécessaire à son fonctionnement local.

## Contenu

- `plugin.json` : manifeste portable Agent Plugins ;
- `mcp.json` : déclaration du serveur MCP embarqué, lancé depuis `${PLUGIN_ROOT}` ;
- `skills/camptocamp/SKILL.md` : méthode de recherche et de préparation outdoor ;
- `mcp/` : build du MCP Camptocamp embarqué, avec attribution dans `mcp/NOTICE.md` ;
- `assets/ctc.png` : logo Camptocamp.

## 1. Installer le plugin

Installez ce dépôt comme Agent Plugin depuis son dépôt Git ou son dossier local. Le client compatible lit `plugin.json`, découvre `mcp.json`, démarre le serveur local embarqué et charge le skill.

Vous n’avez pas besoin de notre VPS ni d’une configuration MCP séparée pour les clients capables d’exécuter un serveur stdio local. Node.js 18 ou une version ultérieure doit être disponible sur la machine du client.

Le MCP source reste public et indépendant dans [jducerf/mcp-camptocamp](https://github.com/jducerf/mcp-camptocamp). Le répertoire `mcp/` est une copie construite et versionnée dans ce plugin afin de respecter le contrat Agent Plugins et de permettre le lancement par `mcp.json`.

## 2. Utiliser le MCP séparément (facultatif)

Si votre client ne prend pas en charge les Agent Plugins mais accepte les MCP stdio, vous pouvez installer le dépôt MCP directement :

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

## Desktop et Web : retour d’expérience

### Desktop / Codex

Le plugin peut lancer son MCP embarqué en stdio via `mcp.json`, si le client prend en charge le format Agent Plugins et dispose de Node.js 18+.

### ChatGPT Web

ChatGPT Web ne lance pas directement ce serveur stdio local. Pour l’utiliser sur le Web, déployez votre propre copie du MCP derrière un endpoint Streamable HTTP HTTPS, puis connectez cette URL dans ChatGPT. Le skill peut être installé séparément selon les capacités de votre espace de travail. Dans notre test, les skills Web sont utilisés en mode **Work** et ne sont pas appelés en mode **Chat**.

L’URL du VPS héberge les fichiers, mais n’est pas une URL d’installation universelle. Une publication Workspace ou dans le répertoire public dépend des permissions, du type de compte et du processus OpenAI correspondant.

## Référence du format

- [Manifest `plugin.json`](https://agent-plugins.org/plugin-authors/manifest)
- [Déclaration des serveurs MCP](https://agent-plugins.org/plugin-authors/mcp-servers)
- [Skills](https://agent-plugins.org/plugin-authors/skills)

## Sécurité et limites

Le MCP recommandé est public et read-only. Le plugin ne crée, ne modifie et ne supprime aucun contenu Camptocamp. Les conditions, la météo, la nivologie, les accès et la sécurité doivent être vérifiés avec des sources actuelles et sur le terrain.

## Licence

MIT. Voir `LICENSE`.
