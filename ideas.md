# Design direction

## Source and reference
The owner explicitly requested a close, improved recreation of `https://recquiem.net/Home` and confirmed that they own the reference site and want its images reused. Treat its information architecture and visual assets as source material: a full-width image hero, compact top navigation and search, four Cross-Platform / Create / Compete / Cooperate feature panels, and room discovery. Preserve the RecQuiem wordmark and icon identity where available. Improve spacing, hierarchy, responsiveness, browse affordances, and finish rather than inventing a different product concept.

## Design movement
A restrained community portal: familiar game-community structure with editorial spacing, quiet surfaces, and real supplied RecQuiem artwork. The result should feel like an established fan/community website, not a marketing template.

## Core principles
- Keep navigation, universal search, featured artwork, feature panels, rooms, people, and useful footer links legible and easy to reach.
- Use the reference site's own images, copied into the project; do not hotlink its assets at runtime.
- Keep the interface focused on actual Rec Room community content. Do not seed room, player, leaderboard, event, or activity records; show empty states until the owner supplies and configures APIs.
- Use one typed data contract for mock and HTTP implementations so the API transition does not force presentation changes.
- Give actions a low-key response: thin silver edge, restrained color shift, and visible keyboard focus; avoid bouncy, glowing, or excessive hover motion.
- Offer a compact logo slot that can be replaced with the updated logo the owner plans to send.

## Color philosophy
Use near-black, charcoal, layered graphite, soft white and cool silver. The supplied images provide most of the tonal variation. Keep silver for borders, small labels and concise calls to action; do not carry over the reference site's blue/orange styling because the owner explicitly requested black, gray and silver.

## Layout paradigm
A responsive centered content column with a full-width hero, slim horizontal community navigation, broad search, a row/grid of the four reference feature cards, and a featured room catalog. Keep the Home hero title to “RecQuiem” with its face mark beside it; omit slogans and the bottom creator-name/activity/closing panels. Rooms, people, leaderboard, events, profiles, and detail pages remain direct navigable routes. On small screens, navigation collapses into an accessible menu and card grids reduce columns without horizontal scrolling.

## Signature elements
- The `RecQuiem` wordmark asset from the reference site, and its face icon for favicon/project branding.
- A tall, own-site banner image with a darkened text-safe region for the primary heading and discovery actions.
- The four exact supplied feature illustrations, reused with the feature topics they represent.
- Supplied platform badges displayed in a platform availability row, preserving the reference site's support info.
- A compact silver-outline room card treatment that lets the original room art carry the color.

## Interaction philosophy
Search can target all content, rooms, or people; results update predictably. Catalog controls filter and sort without disguising empty/error outcomes. Room saves, follow state and list paging provide concise accessible feedback. Do not invent authentication or actual matchmaking: sign-in and play calls are honest preview actions. Respect reduced-motion preferences.

## Animation
Near-static. Short border and color transitions only, with motion disabled when the user requests reduced motion. Avoid persistent motion, oversized transforms, or animated gradients.

## Typography system
Use a familiar Arial/Helvetica sans-serif stack for headings and body copy. Keep weight and spacing ordinary and readable, with no novelty display font or slogan-style headings.

## Brand essence and voice
RecQuiem is a community space around Rec Room rooms and creators. Use functional page labels and factual copy rather than slogans. Keep the existing spelling `RecQuiem` where it appears as the brand; use no emoji.

## Wordmark / logo
Use the current RecQuiem wordmark image from the owner's site in the header. Pair the existing face icon beside the plain “RecQuiem” heading in the hero, and use it as the site favicon and project icon. Keep both paths easy to replace when the owner sends a newer logo.

## Signature brand color
Silver on charcoal: `#C8C9CC` accents against `#101112`, `#191A1D`, and `#232427`; main type `#F0F0F1`; muted type `#9A9CA1`.
