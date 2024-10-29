import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { TagsQuizComponent } from '../components/section/Tags/Quiz/TagsQuizComponents'
import { TagQuestionComponent } from '../components/section/Tags/Question/TagQuestionComponent'


export function AdminScreen() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="questions">Preguntas</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <TagsQuizComponent />
        </TabsContent>
        <TabsContent value="questions">
          <TagQuestionComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}