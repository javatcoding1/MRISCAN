import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Brain } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar className="bg-primary-900/90 backdrop-blur-sm">
      <NavbarBrand>
        <Brain className="w-8 h-8 text-primary-200" />
        <p className="font-bold text-inherit text-primary-100 ml-2">NeuroScan AI</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            className="text-primary-100 bg-transparent"
            variant="light"
            onClick={() => scrollToSection('about')}
          >
            About
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="text-primary-100 bg-transparent"
            variant="light"
            onClick={() => scrollToSection('documentation')}
          >
            Documentation
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button 
            className="bg-primary-100 text-primary-900 font-semibold"
            variant="flat"
            onClick={() => scrollToSection('scanner')}
          >
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}