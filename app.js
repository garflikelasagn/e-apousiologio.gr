import express from 'express'
import { getNotes, getNote, createNote } from './database.js'

const app = express()
app.use(express.json())

// This line serves static files like your HTML and CSS from the current directory
app.use(express.static('.')) 

app.get("/notes", async (req, res) => {
  const notes = await getNotes()
  res.send(notes)
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})

app.post("/notes", async (req, res) => {
  const { firstName, lastName, tmima } = req.body
  const note = await createNote(firstName, lastName, tmima)
  res.status(201).send(note)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke')
})

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})