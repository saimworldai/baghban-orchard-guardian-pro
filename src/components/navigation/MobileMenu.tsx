
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthProvider";

export function MobileMenu() {
  const { role } = useUserRole();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" className="p-2">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navigate through the application.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <NavLinks isMobile={true} role={role} onItemClick={handleClose} />
          {user ? (
            <UserMenu isMobile={true} onItemClick={handleClose} />
          ) : (
            <UserMenu isMobile={true} onItemClick={handleClose} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
