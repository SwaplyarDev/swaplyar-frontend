'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { Pencil, Check, X } from 'lucide-react'
import { updateUserProfileAdmin } from '@/actions/userVerification/verification.action'

export function EditUserModal({ user, onClose, onUpdated }: any) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [formData, setFormData] = useState(user)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async (field: string) => {
    setLoading(true)
    try {
      const cleaned = { [field]: formData[field] }
      const res = await updateUserProfileAdmin(user.id, cleaned)
      if (res.success) {
        alert('✅ Campo actualizado correctamente')
        setEditingField(null)
        onUpdated?.()
      }
    } catch {
      alert('❌ Error al actualizar el campo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar datos del usuario</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-3">
          {['firstName', 'lastName', 'nickName', 'email', 'phone'].map((field) => (
            <div key={field} className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <span className="block text-sm text-muted-foreground capitalize">{field}</span>
                <Input
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  disabled={editingField !== field}
                />
              </div>

              {editingField === field ? (
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => handleSave(field)} disabled={loading}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingField(null)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingField(field)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
