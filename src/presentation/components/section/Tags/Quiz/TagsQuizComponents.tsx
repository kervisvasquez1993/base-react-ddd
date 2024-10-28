import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useInitialDataQuiz } from '@/presentation/hooks/initialDataQuizTabline';
import { AddQuizComponent } from './AddQuizComponents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table';
import { Spinner } from '../../SpinerComponents';
import { EditQuizComponents } from './EditQuizComponents';
import { Button } from '@/presentation/components/ui/button';


export const TagsQuizComponent = () => {
    const { data, isLoading } = useInitialDataQuiz();
    return (
        <>
            <div className="mb-4">
                <AddQuizComponent />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        data.data.map((quiz: any) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>{quiz.description}</TableCell>
                                <TableCell>
                                    <EditQuizComponents quiz={quiz} />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => console.log(quiz.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>


        </>
    );
};
