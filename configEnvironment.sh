#!/bin/sh
case "$1" in
    local)
        # write frontend file
        echo "// This is client side config only - don't put anything in here that shouldn't be public!\nexport const endpoint = \`http://localhost:4444\`;\nexport const perPage = 4;" | tee './frontend/config.js' > /dev/null
        # write backend file
        echo "FRONTEND_URL=\"http://localhost:7777\"
PRISMA_ENDPOINT=\"http://GQLHOSTSERVERIP:4466/skyfall/dev\"
PRISMA_SECRET=\"Thiszu8!\")679324907\")&(=/ยง654\"
APP_SECRET=\"mahCustomSkyfall!Zecrta43\"
STRIPE_SECRET=\"sk_123youchanget his\"
PORT=4444
PRISMA_MANAGEMENT_API_SECRET=\"thiasKv!keot789236z\"
MAIL_HOST=\"smtp.strato.de\"
MAIL_PORT=465
MAIL_USER=\"office@k-vk.de\"
MAIL_PASS=\"phonTOCHENal\"" | tee './backend/variables.env' > /dev/null
        ;;

    cloud)
        echo "// This is client side config only - don't put anything in here that shouldn't be public!\nexport const endpoint = \`http://104.248.132.172:4444\`;\nexport const perPage = 4;" | tee './frontend/config.js' > /dev/null
        echo "FRONTEND_URL=\"http://104.248.132.172:7777\"
PRISMA_ENDPOINT=\"http://GQLHOSTSERVERIP:4466/skyfall/dev\"
PRISMA_SECRET=\"Thiszu8!\")679324907\")&(=/ยง654\"
APP_SECRET=\"mahCustomSkyfall!Zecrta43\"
STRIPE_SECRET=\"sk_123youchanget his\"
PORT=4444
PRISMA_MANAGEMENT_API_SECRET=\"thiasKv!keot789236z\"
MAIL_HOST=\"smtp.strato.de\"
MAIL_PORT=465
MAIL_USER=\"office@k-vk.de\"
MAIL_PASS=\"phonTOCHENal\"" | tee './backend/variables.env' > /dev/null
        ;;

    demo)
        echo "// This is client side config only - don't put anything in here that shouldn't be public!\nexport const endpoint = \`http://CLOUDDEMOIDEIP:4444\`;\nexport const perPage = 4;" | tee './frontend/config.js' > /dev/null
        echo "FRONTEND_URL=\"http://CLOUDDEMOIDEIP\"
PRISMA_ENDPOINT=\"http://GQLHOSTSERVERIP:4466/skyfall/dev\"
PRISMA_SECRET=\"Thiszu8!\")679324907\")&(=/ยง654\"
APP_SECRET=\"mahCustomSkyfall!Zecrta43\"
STRIPE_SECRET=\"sk_123youchanget his\"
PORT=4444
PRISMA_MANAGEMENT_API_SECRET=\"thiasKv!keot789236z\"
MAIL_HOST=\"smtp.strato.de\"
MAIL_PORT=465
MAIL_USER=\"office@k-vk.de\"
MAIL_PASS=\"phonTOCHENal\"" | tee './backend/variables.env' > /dev/null
        ;;

    prod)
        echo "// This is client side config only - don't put anything in here that shouldn't be public!\nexport const endpoint = \`https://skyfall.app:4444\`;\nexport const perPage = 4;" | tee './frontend/config.js' > /dev/null
        echo "FRONTEND_URL=\"https://skyfall.app\"
PRISMA_ENDPOINT=\"http://GQLHOSTSERVERIP:4466/skyfall/dev\"
PRISMA_SECRET=\"Thiszu8!\")679324907\")&(=/ยง654\"
APP_SECRET=\"mahCustomSkyfall!Zecrta43\"
STRIPE_SECRET=\"sk_123youchanget his\"
PORT=4444
PRISMA_MANAGEMENT_API_SECRET=\"thiasKv!keot789236z\"
MAIL_HOST=\"smtp.strato.de\"
MAIL_PORT=465
MAIL_USER=\"office@k-vk.de\"
MAIL_PASS=\"phonTOCHENal\"" | tee './backend/variables.env' > /dev/null
        ;;
    *)
        echo $"Usage: $0 {local|cloud|demo|prod}"
        exit 1

esac
