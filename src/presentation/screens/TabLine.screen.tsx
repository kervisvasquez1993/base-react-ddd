import { BadgeQuizComponents } from '../components/section/BadgeQuiz.components'
import { QuestionSectionComponent } from '../components/section/QuestionSection.components'
export function TablineScreen() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <div className="container mx-auto p-4 space-y-8">
                    <BadgeQuizComponents />
                    <QuestionSectionComponent />
                </div>
            </main>
        </div>
    )
}