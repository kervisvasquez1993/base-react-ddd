import React, { useState } from 'react'

import { Pencil } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog';
import { Label } from '@/presentation/components/ui/label';
import { Input } from '@/presentation/components/ui/input';
interface Quiz {
    id: string
    title: string,
    description: string
}

interface Props {
    quiz: Quiz
}

export const EditQuizComponents = ({ quiz }: Props) => {
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditCategoryOpen(true)}
            >
                <Pencil className="h-4 w-4" />
            </Button>

            <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Quiz</DialogTitle>
                    </DialogHeader>
                    {quiz && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const name = (e.target as HTMLFormElement).title;
                            // updateCategory(quiz.id, name);
                            console.log("hola")
                        }}>
                            <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                            <Input id="categoryName"  value={quiz.title}/>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

