# Camptocamp Outdoor Agent Plugin

Plugin portable read-only pour assistants et agents capables de charger le format Agent Plugins. Il regroupe le MCP public Camptocamp et un skill de préparation outdoor ; il ne recrée pas la logique du MCP.

## Contenu

- `plugin.json` : manifeste portable Agent Plugins ;
- `mcp.json` : connexion Streamable HTTP vers `https://camptocamp.julien-ducerf.com/mcp` ;
- `skills/camptocamp/SKILL.md` : méthode de recherche et de préparation outdoor ;
- `assets/ctc.png` : logo Camptocamp.

## Desktop et Web : retour d’expérience

### Desktop / Codex

Le paquet complet peut être installé depuis un dossier local ou un marketplace Git. Le format OpenAI ajoute `.codex-plugin/plugin.json`, `.app.json` et éventuellement `.mcp.json`. Cette variante communautaire reste volontairement générique et ne contient aucun identifiant de connexion privé.

### ChatGPT Web

Dans notre test, le chemin fiable est de connecter le MCP Camptocamp dans ChatGPT puis d’importer le skill séparément via **Skills → Create → Upload**. Le skill est conçu pour s’activer lorsque l’app/MCP Camptocamp est présent dans la conversation. Sur le Web, les skills sont utilisés en mode **Work** ; ils ne sont pas appelés en mode **Chat**.

L’URL du VPS héberge les fichiers, mais n’est pas une URL d’installation universelle. Une publication Workspace ou dans le répertoire public dépend des permissions, du type de compte et du processus OpenAI correspondant.

## Sécurité et limites

Le MCP est public et read-only. Le plugin ne crée, ne modifie et ne supprime aucun contenu Camptocamp. Les conditions, la météo, la nivologie, les accès et la sécurité doivent être vérifiés avec des sources actuelles et sur le terrain.

## Licence

MIT. Voir `LICENSE`.
