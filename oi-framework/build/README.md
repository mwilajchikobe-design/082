# Build scripts

Source for the two decks in the parent folder. Edit the content here and rebuild instead of hand-editing the .pptx files when changing structure.

```bash
npm install pptxgenjs react-icons react react-dom sharp
export NODE_PATH=$PWD/node_modules
export PPTX_SKILL=<path to the pptx skill>   # supplies scripts/apply_theme.js
node client.js   ../Challenge-Journey_Client-Deck.pptx
node playbook.js ../Challenge-Journey_Playbook.pptx
node nsf_client.js   ../nsf/NSF-Quantum-Algorithms-Challenge_Working-Session-Deck.pptx
node nsf_playbook.js ../nsf/NSF-Quantum-Algorithms-Challenge_Delivery-Playbook-INTERNAL.pptx
```

- `lib.js`: theme (Cambria/Calibri, teal + coral palette), slide layouts, the six-phase content model and the one-page framework graphic.
- `client.js`: 17-slide client discussion deck for a 60–90 minute first meeting.
- `playbook.js`: 25-slide internal playbook (tools, gates, workshops, evidence bank).
- `nsf_client.js` → `../nsf/NSF-Quantum-Algorithms-Challenge_Working-Session-Deck.pptx`: NSF edition of the client deck (16 slides, no contractor branding) for the session with NSF and the Quantum+X industry collaborators.
- `nsf_playbook.js` → `../nsf/NSF-Quantum-Algorithms-Challenge_Delivery-Playbook-INTERNAL.pptx`: NSF edition of the playbook (13 slides, internal only): RFTP traceability, dated gates, tools applied, risks, KPIs, meeting agenda.

Client editions reuse `lib.js` and pass their own footer via `newDeck(title, { footer })`; the generic decks are unaffected. Change the `NAME` constant at the top of each NSF script once the official competition name is confirmed.
