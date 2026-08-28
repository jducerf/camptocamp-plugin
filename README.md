# Camptocamp Outdoor Agent Plugin

Plugin portable read-only pour assistants et agents capables de charger le format Agent Plugins. Il fournit le skill de préparation outdoor et documente le raccordement à un MCP Camptocamp installé par chaque utilisateur.

## Contenu

- `plugin.json` : manifeste portable Agent Plugins ;
- `skills/camptocamp/SKILL.md` : méthode de recherche et de préparation outdoor ;
- `assets/ctc.png` : logo Camptocamp.

## Desktop et Web : retour d’expérience

### Installer le MCP

Le plugin ne pointe vers aucun serveur personnel et n’embarque pas de copie du MCP. Installe le MCP depuis [jducerf/mcp-camptocamp](https://github.com/jducerf/mcp-camptocamp), puis configure ton client avec le transport adapté (stdio en local, ou Streamable HTTP si tu héberges ton propre endpoint).

### Desktop / Codex

Le paquet peut être installé depuis un dossier local ou un marketplace Git. Cette variante communautaire reste volontairement générique et ne contient aucun endpoint ni identifiant de connexion privé. Le MCP est configuré séparément par l’utilisateur.

### ChatGPT Web

Dans notre test, le chemin fiable est de connecter le MCP Camptocamp dans ChatGPT puis d’importer le skill séparément via **Skills → Create → Upload**. Le skill est conçu pour s’activer lorsque l’app/MCP Camptocamp est présent dans la conversation. Sur le Web, les skills sont utilisés en mode **Work** ; ils ne sont pas appelés en mode **Chat**.

L’URL du VPS héberge les fichiers, mais n’est pas une URL d’installation universelle. Une publication Workspace ou dans le répertoire public dépend des permissions, du type de compte et du processus OpenAI correspondant.

## Sécurité et limites

Le MCP recommandé est public et read-only. Le plugin ne crée, ne modifie et ne supprime aucun contenu Camptocamp. Les conditions, la météo, la nivologie, les accès et la sécurité doivent être vérifiés avec des sources actuelles et sur le terrain.

## Licence

MIT. Voir `LICENSE`.
