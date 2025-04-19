import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";


export function Preferences() {
    return (
      <div className="mr-10 mt-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Booking</h3>
                  <p className="text-sm text-slate-500">Get notified when a new booking is made</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newBookings" className="rounded text-green-600" defaultChecked />
                </div>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Booking Cancellations</h3>
                  <p className="text-sm text-slate-500">Get notified when a booking is cancelled</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newBookings" className="rounded text-green-600" defaultChecked />
                </div>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">System Updates</h3>
                  <p className="text-sm text-slate-500">Get notified about system updates and maintenance</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newBookings" className="rounded text-green-600" />
                </div>
              </div>
              <Separator/>
            </CardContent>
        </Card>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Display Setting</CardTitle>
            <CardDescription>Customies your setting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-slate-500">Switch between light and dark mode</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode"/>
              </div>
            </div>
            <Separator/>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Compact View</h3>
                <p className="text-sm text-slate-500">Display more information with less spacing</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode"/>
              </div>
            </div>
            <Separator/>
          </CardContent>
        </Card>
      </div>
    );
  }