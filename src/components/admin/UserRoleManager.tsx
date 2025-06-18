
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Users, Shield, UserCheck } from "lucide-react";

export function UserRoleManager() {
  const [adminEmail, setAdminEmail] = useState('');

  const handleAssignAdmin = () => {
    if (!adminEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    // Show SQL command for manual execution
    const sqlCommand = `INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = '${adminEmail}' 
ON CONFLICT (user_id, role) DO NOTHING;`;

    navigator.clipboard.writeText(sqlCommand).then(() => {
      toast.success('SQL command copied to clipboard! Run it in your Supabase SQL editor.');
      console.log('Execute this SQL command in Supabase:', sqlCommand);
    });

    setAdminEmail('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Assign Admin Role
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">User Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="user@example.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleAssignAdmin} className="w-full">
            <UserCheck className="h-4 w-4 mr-2" />
            Generate Admin Assignment Command
          </Button>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Instructions:</p>
            <p>1. Enter the email of the user you want to make an admin</p>
            <p>2. Click the button to copy the SQL command</p>
            <p>3. Go to your Supabase SQL editor and run the command</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Role Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <Badge className="bg-green-100 text-green-800 mb-2">Farmer</Badge>
              <p className="text-sm text-gray-600">Default role for new users. Can access basic farming features.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Badge className="bg-blue-100 text-blue-800 mb-2">Consultant</Badge>
              <p className="text-sm text-gray-600">Can provide expert consultations and advice to farmers.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Badge className="bg-red-100 text-red-800 mb-2">Admin</Badge>
              <p className="text-sm text-gray-600">Full access to admin dashboard and user management.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
