# Estructura del proyecto

Este archivo describe la estructura principal del workspace.

```
components.json
CONTEXT.md
eslint.config.mjs
next-env.d.ts
next.config.mjs
package.json
payload.config.ts (ahora importa `featureCollections` desde src/payload-collections.generated.ts)
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
README.md
tsconfig.json
__tmp__/
    nexus-academy/
        components.json
        middleware.ts
        next.config.mjs
        package.json
        pnpm-lock.yaml
        postcss.config.mjs
        README.md
        tsconfig.json
        app/
            globals.css
            layout.tsx
            page.tsx
            [lang]/
        components/
            accordion.tsx
            app-sidebar.tsx
            assessment-card.tsx
            badge.tsx
            bookmark-button.tsx
            ...
        hooks/
        lib/
        locales/
        public/
        scripts/
        styles/
    reso-coder/
_templates/
    feature/
        crud/
        new/
    generator/
        help/
        new/
        with-prompt/
    init/
        repo/
public/
    docs/
    images/
scripts/
    gen-feature-multi.mjs
    postinstall.sh
    validate-payload-paths.mjs
    generate-payload-collections.mjs
src/
    app/
        globals.css
        layout.tsx
        page.tsx
        assessments/
        bookmarks/
        briefs/
        career-paths/
        certifications/
        collections/
        contact/
        courses/
        explore/
        feed/
        history/
        home/
        jobs/
        leaderboard/
        learning/
        login/
        menu/
        privacy/
        profile/
        resource/
        resources/
        salary-explorer/
        search/
        settings/
        showcase/
        signup/
        terms/
        tutorials/
    core/
        error/
        ui/
    features/
        assessments/
        auth/
        bookmarks/
        briefs/
        career-paths/
        courses/
        discover/
        enrollments/
        feed/
        history/
        learning/
        preferences/
        profile/
        resources/
        search/
    lib/
        i18n/
    payload-collections.generated.ts
tmp/
    section-video-next/
        dev/

```

Notas:
- `scripts/generate-payload-collections.mjs`: script que genera `src/payload-collections.generated.ts` importando todas las `*.collection.ts` bajo `src/features/**/data/datasources/payload`.
- `payload.config.ts` ahora importa `featureCollections` desde `src/payload-collections.generated.ts` para centralizar todas las collections por feature.

Si quieres, puedo:

- Añadir un script `pnpm payload:build` que ejecute el generador antes de arrancar Payload.
- Incluir en la documentación las convenciones de naming para archivos `.collection.ts`.
