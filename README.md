# Simple TODO-list
Use:
- React
- Redux-rematch 
- Typescript
- Material-UI
- SASS

### To run the project use `npm run start`

## What the application can do
- Display notes
- Add and edit notes
- Pin notes to top (note that you can't filter or find pinned note)
- Search notes by `title` and `description`
- Filter notes by tags
- add and delete tags

## Known issues
- List can display incorrectly if you're editing searched or filtered note
- React can fail with keys. In that case note duplicates are possible

## Known code issues
- Need to install `esLint` and `Prettier`
- Need to add `Redux-logger`
- No test. Probably need `jest` and unit-test coverage
- Problem with import through `index.js `
- Code in `helpers` and `models` has to be simplified 