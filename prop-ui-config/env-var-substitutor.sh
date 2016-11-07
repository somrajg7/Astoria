# Replaces env specific placeholders using env variables
sed -i -e "s|{{ENVIRONMENT}}|$ENVIRONMENT|g" -e "s|{{API_HOST}}|$API_HOST|g" -e "s|{{OAUTH_USERNAME}}|$OAUTH_USERNAME|g" -e "s|{{OAUTH_SECRET}}|$OAUTH_SECRET|g" assets/app.js
