import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table'
import { User } from 'lucide-react'
import React from 'react'


export function ClasificationScreen() {
  // Ordenamos los usuarios por puntos de mayor a menor
  // const sortedUsers = [...users].sort((a, b) => b.points - a.points)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="text-3xl font-bold text-center">Ranking de Usuarios</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead className="text-xl">Usuario</TableHead>
              <TableHead className="text-xl">Correo Electrónico</TableHead>
              <TableHead className="text-right text-xl">Puntos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {sortedUsers.map((user) => (
              <TableRow key={user.id} className="text-lg">
                <TableCell>
                  <User className="h-8 w-8 text-primary" />
                </TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right font-bold">{user.points}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


