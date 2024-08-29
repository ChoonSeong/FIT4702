// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { EyeIcon, HistoryIcon, FileTextIcon, SettingsIcon, BellIcon, UserCircleIcon, PlusIcon, MinusIcon, LayersIcon } from 'lucide-react'

export default function DashboardPage() {
    const [selectedLocation, setSelectedLocation] = useState('Hospital Wing A')
    const [selectedFloor, setSelectedFloor] = useState('Floor 1')
    const [selectedZone, setSelectedZone] = useState('All Zones')
    const [selectedGroup, setSelectedGroup] = useState('All')
    const [selectedObject, setSelectedObject] = useState('All Objects')
    const [drawTracks, setDrawTracks] = useState(false)
  
    const assetPositions = [
      { id: 'bed_1', x: 100, y: 150, type: 'bed' },
      { id: 'wheelchair_1', x: 300, y: 200, type: 'wheelchair' },
      { id: 'bloodbox_1', x: 500, y: 100, type: 'bloodbox' },
      { id: 'bed_2', x: 700, y: 300, type: 'bed' },
      { id: 'wheelchair_2', x: 200, y: 400, type: 'wheelchair' },
    ]
  
    return (
      <div className="flex flex-col h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Hospital Asset Tracker</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary">
              <EyeIcon className="w-4 h-4 mr-2" />
              Online tracking
            </Button>
            <Button variant="ghost">
              <HistoryIcon className="w-4 h-4 mr-2" />
              Track history
            </Button>
            <Button variant="ghost">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button variant="ghost">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospital Wing A">Hospital Wing A</SelectItem>
                <SelectItem value="Hospital Wing B">Hospital Wing B</SelectItem>
                <SelectItem value="Emergency Room">Emergency Room</SelectItem>
              </SelectContent>
            </Select>
            <BellIcon className="w-6 h-6 text-muted-foreground" />
            <UserCircleIcon className="w-6 h-6 text-muted-foreground" />
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 p-4 border-r overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Floor</label>
                <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Floor 1">Floor 1</SelectItem>
                    <SelectItem value="Floor 2">Floor 2</SelectItem>
                    <SelectItem value="Floor 3">Floor 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Zones</label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Zones">All Zones</SelectItem>
                    <SelectItem value="Zone A">Zone A</SelectItem>
                    <SelectItem value="Zone B">Zone B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Group</label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Beds">Beds</SelectItem>
                    <SelectItem value="Wheelchairs">Wheelchairs</SelectItem>
                    <SelectItem value="Blood Boxes">Blood Boxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Object</label>
                <Select value={selectedObject} onValueChange={setSelectedObject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select object" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Objects">All Objects</SelectItem>
                    <SelectItem value="Bed 1">Bed 1</SelectItem>
                    <SelectItem value="Wheelchair 1">Wheelchair 1</SelectItem>
                    <SelectItem value="Blood Box 1">Blood Box 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="draw-tracks" checked={drawTracks} onCheckedChange={setDrawTracks} />
                <label htmlFor="draw-tracks" className="text-sm font-medium">
                  Draw tracks
                </label>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Objects on the floor: 5</p>
              <p className="text-sm text-muted-foreground">Objects in the building: 20</p>
            </div>
          </aside>
          <main className="flex-1 p-4 overflow-hidden">
            <Card className="h-full">
              <CardContent className="p-0 h-full relative">
                <div className="absolute top-4 left-4 z-10 space-y-2">
                  <Button size="icon" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <LayersIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-full w-full bg-accent relative">
                  {assetPositions.map((asset) => (
                    <div
                      key={asset.id}
                      className="absolute w-4 h-4 rounded-full bg-primary"
                      style={{ left: asset.x, top: asset.y }}
                      title={`${asset.type} - ${asset.id}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }