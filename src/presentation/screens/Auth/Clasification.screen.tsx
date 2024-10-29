import { Spinner } from '@/presentation/components/section/SpinerComponents'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table'
import { usePositionUser } from '@/presentation/hooks/loadDataPositionUser'
import { useAuthStore } from '@/presentation/store/useAuthStatus.store'
import { User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


export function ClasificationScreen() {
  const token = useAuthStore(state => state.token)
  const { data, isLoading } = usePositionUser()
  console.log(data)
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
              <TableHead className="text-right text-xl">Acciones</TableHead> {/* Nueva columna para el botón */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <Spinner />
            ) : (
              data.map((user:any) => (
                <TableRow key={user.id} className="text-lg">
                  <TableCell>
                    <User className="h-8 w-8 text-primary" />
                  </TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right font-bold">{user.points}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={token ? `/dashboard/user/${user.id}` : `/user/${user.id}`}
                    >
                      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Ver más
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  )
}


