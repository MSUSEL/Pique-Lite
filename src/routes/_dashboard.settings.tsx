import React from "react";
import { ColorModeToggle } from "@/composites/Settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskLevelConfig } from "@/composites/RiskLevelSettings";

export default function SettingsPage() {
  return (
    <div className="h-[calc(100vh-49px)] overflow-y-auto">
      <div className="container mx-auto p-6 space-y-6">
        {/* title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your PIQUE-Lite preferences and accessibility options
          </p>
        </div>

        {/* Accessibility + Color Modes（ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Accessibility &amp; Color Modes</h2>

          {/* color mode */}
          <ColorModeToggle />

          {/* About Color Modes  */}
          <Card>
            <CardHeader>
              <CardTitle>About Color Modes</CardTitle>
              <CardDescription>
                Understanding the difference between normal and colorblind-friendly modes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Normal Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Uses traditional risk colors with a green-to-red spectrum. Suitable for
                  users without color vision deficiencies.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Colorblind-Friendly Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Uses carefully selected colors (magenta, orange, yellow, purple, blue)
                  that are distinguishable by people with various types of color vision
                  deficiencies, including protanopia, deuteranopia, and tritanopia.
                </p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Tip:</strong> Your color mode preference is automatically saved
                  and will persist across browser sessions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Level Configuration Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Risk Levels</h2>
          <RiskLevelConfig />
        </div>
      </div>
    </div>
  );
}
