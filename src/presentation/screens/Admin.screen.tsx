'use client'

import { useState } from 'react'
import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'

// Tipos de datos
type Category = {
  id: number
  name: string
}

type Question = {
  id: number
  question: string
  isCorrect: boolean
  image: string
  categoryId: number
}

export  function AdminScreen() {

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Ciencia' },
    { id: 2, name: 'Historia' },
  ])
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: '¿Cuál es la capital de Francia?', isCorrect: true, image: '/placeholder.svg', categoryId: 2 },
    { id: 2, question: '¿Cuál es el símbolo químico del agua?', isCorrect: true, image: '/placeholder.svg', categoryId: 1 },
  ])

  // Estados para modales
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false)
  const [isEditImageOpen, setIsEditImageOpen] = useState(false)

  // Estados para edición
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  // Funciones para categorías
  const addCategory = (name: string) => {
    const newCategory = { id: categories.length + 1, name }
    setCategories([...categories, newCategory])
    setIsAddCategoryOpen(false)
  }

  const updateCategory = (id: number, name: string) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, name } : cat))
    setIsEditCategoryOpen(false)
  }

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  // Funciones para preguntas
  const addQuestion = (question: string, isCorrect: boolean, image: File, categoryId: number) => {
    const newQuestion = { 
      id: questions.length + 1, 
      question, 
      isCorrect, 
      image: URL.createObjectURL(image), 
      categoryId 
    }
    setQuestions([...questions, newQuestion])
    setIsAddQuestionOpen(false)
  }

  const updateQuestion = (id: number, question: string, isCorrect: boolean, categoryId: number) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, question, isCorrect, categoryId } : q))
    setIsEditQuestionOpen(false)
  }

  const updateQuestionImage = (id: number, image: File) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, image: URL.createObjectURL(image) } : q))
    setIsEditImageOpen(false)
  }

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="questions">Preguntas</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <div className="mb-4">
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button>Agregar Categoría</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const name = (e.target as HTMLFormElement).categoryName.value
                  addCategory(name)
                }}>
                  <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                  <Input id="categoryName" name="categoryName" required />
                  <Button type="submit" className="mt-4">Guardar</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingCategory(category)
                      setIsEditCategoryOpen(true)
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Categoría</DialogTitle>
              </DialogHeader>
              {editingCategory && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const name = (e.target as HTMLFormElement).categoryName.value
                  updateCategory(editingCategory.id, name)
                }}>
                  <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                  <Input id="categoryName" name="categoryName" defaultValue={editingCategory.name} required />
                  <Button type="submit" className="mt-4">Actualizar</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value="questions">
          <div className="mb-4">
            <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
              <DialogTrigger asChild>
                <Button>Agregar Pregunta</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Pregunta</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const question = (e.target as HTMLFormElement).question.value
                  const isCorrect = (e.target as HTMLFormElement).isCorrect.checked
                  const image = (e.target as HTMLFormElement).image.files[0]
                  const categoryId = parseInt((e.target as HTMLFormElement).categoryId.value)
                  addQuestion(question, isCorrect, image, categoryId)
                }}>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="question">Pregunta</Label>
                      <Input id="question" name="question" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isCorrect" name="isCorrect" />
                      <Label htmlFor="isCorrect">Es correcta</Label>
                    </div>
                    <div>
                      <Label htmlFor="image">Imagen</Label>
                      <Input id="image" name="image" type="file" accept="image/*" required />
                    </div>
                    <div>
                      <Label htmlFor="categoryId">Categoría</Label>
                      <Select name="categoryId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Guardar</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pregunta</TableHead>
                <TableHead>Correcta</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.question}</TableCell>
                  <TableCell>{question.isCorrect ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{categories.find(c => c.id === question.categoryId)?.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingQuestion(question)
                      setIsEditQuestionOpen(true)
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingQuestion(question)
                      setIsEditImageOpen(true)
                    }}>
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={isEditQuestionOpen} onOpenChange={setIsEditQuestionOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Pregunta</DialogTitle>
              </DialogHeader>
              {editingQuestion && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const question = (e.target as HTMLFormElement).question.value
                  const isCorrect = (e.target as HTMLFormElement).isCorrect.checked
                  const categoryId = parseInt((e.target as HTMLFormElement).categoryId.value)
                  updateQuestion(editingQuestion.id, question, isCorrect, categoryId)
                }}>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="question">Pregunta</Label>
                      <Input id="question" name="question" defaultValue={editingQuestion.question} required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isCorrect" name="isCorrect" defaultChecked={editingQuestion.isCorrect} />
                      <Label htmlFor="isCorrect">Es correcta</Label>
                    </div>
                    <div>
                      <Label htmlFor="categoryId">Categoría</Label>
                      <Select name="categoryId" defaultValue={editingQuestion.categoryId.toString()} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Actualizar</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
          <Dialog open={isEditImageOpen} onOpenChange={setIsEditImageOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Imagen de la Pregunta</DialogTitle>
              </DialogHeader>
              {editingQuestion && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const image = (e.target as HTMLFormElement).image.files[0]
                  updateQuestionImage(editingQuestion.id, image)
                }}>
                  <div>
                    <Label htmlFor="image">Nueva Imagen</Label>
                    <Input id="image" name="image" type="file" accept="image/*" required />
                  </div>
                  <Button type="submit" className="mt-4">Actualizar Imagen</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}