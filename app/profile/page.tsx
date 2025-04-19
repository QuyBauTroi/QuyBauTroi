"use client";

import { Tabs } from "@/components/ui/tabs";
import MainLayout from "../../components/Layout/MainLayout";
import { TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { PersonalInformation } from "@/components/Profile/PersonInformation";
import { Security } from "@/components/Profile/Security";
import { Preferences } from "@/components/Profile/Preferences";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <MainLayout>
      <main className="pl-8 pt-8 mt-16">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-green-200 inline-block  ">Profile</h1>
      </main>

      <Tabs className="ml-6 mt-4 " defaultValue="personal" >
        <TabsList className="mb-4 bg-green-100">
          <TabsTrigger value="personal" >Personal Infomation</TabsTrigger>
          <TabsTrigger value="security" >Security</TabsTrigger>
          <TabsTrigger value="preferences" >Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInformation />
        </TabsContent>
        <TabsContent value="security" className="space-y-6">
          <Security/>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-6">
          <Preferences/>
        </TabsContent>
       
      </Tabs>
    </MainLayout>
  );
}