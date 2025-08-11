"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Eye, Edit, Copy, Trash2 } from 'lucide-react'

const emailTemplates = [
  {
    id: 1,
    name: "Demo Confirmation",
    subject: "Your DairySense Demo is Scheduled",
    type: "demo",
    status: "active",
    lastUsed: "2024-01-28",
    content: `Hi {{farmerName}},

Thank you for your interest in DairySense! Your demo has been scheduled for {{demoDate}} at {{demoTime}}.

During the demo, we'll show you:
- Real-time cow health monitoring
- Milk production tracking
- Automated alerts and notifications
- Farm management dashboard

Meeting Link: {{meetingLink}}

If you need to reschedule, please contact us at least 24 hours in advance.

Best regards,
The DairySense Team`
  },
  {
    id: 2,
    name: "Welcome New User",
    subject: "Welcome to DairySense - Let's Get Started!",
    type: "onboarding",
    status: "active",
    lastUsed: "2024-01-27",
    content: `Welcome to DairySense, {{farmerName}}!

We're excited to help you revolutionize your dairy farming operations. Your account has been successfully created for {{farmName}}.

Next Steps:
1. Complete your farm profile
2. Set up your first monitoring devices
3. Schedule a setup call with our team

Login to your dashboard: {{dashboardLink}}

Need help? Our support team is here for you 24/7.

Happy farming!
The DairySense Team`
  },
  {
    id: 3,
    name: "Demo Follow-up",
    subject: "Thanks for the Demo - Next Steps",
    type: "follow-up",
    status: "active",
    lastUsed: "2024-01-26",
    content: `Hi {{farmerName}},

Thank you for taking the time to see DairySense in action today. We hope you found the demo valuable and can see how our platform can benefit {{farmName}}.

As discussed, here are the next steps:
- Review the pricing options we shared
- Consider which monitoring package fits your needs
- Schedule a setup call when you're ready

Special Offer: Sign up within 7 days and get 20% off your first year!

Questions? Reply to this email or call us at (555) 123-4567.

Best regards,
{{demoRepName}}
DairySense Sales Team`
  }
]

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(selectedTemplate.content)
  const [editedSubject, setEditedSubject] = useState(selectedTemplate.subject)

  const handleTemplateSelect = (template: typeof emailTemplates[0]) => {
    setSelectedTemplate(template)
    setEditedContent(template.content)
    setEditedSubject(template.subject)
    setIsEditing(false)
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving template:", { subject: editedSubject, content: editedContent })
    setIsEditing(false)
  }

  const handlePreview = () => {
    // In a real app, this would open a preview modal
    console.log("Preview template")
  }

  const handleSendTest = () => {
    // In a real app, this would send a test email
    console.log("Sending test email")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
          <p className="text-gray-600">Manage automated email communications</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Mail className="w-4 h-4 mr-2" />
          Create New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Templates</CardTitle>
            <CardDescription>Select a template to edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emailTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate.id === template.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                    {template.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{template.subject}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="capitalize">{template.type}</span>
                  <span>Used {template.lastUsed}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedTemplate.name}</CardTitle>
                  <CardDescription>
                    {isEditing ? 'Edit template content' : 'Template preview'}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={handlePreview}>
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSendTest}>
                        <Send className="w-4 h-4 mr-1" />
                        Test Send
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                {isEditing ? (
                  <Input
                    id="subject"
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    placeholder="Email subject"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md text-sm font-medium">
                    {selectedTemplate.subject}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                {isEditing ? (
                  <Textarea
                    id="content"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                    placeholder="Email content with {{variables}}"
                  />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-md text-sm whitespace-pre-wrap font-mono">
                    {selectedTemplate.content}
                  </div>
                )}
              </div>

              {/* Variable Reference */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-2">Available Variables:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{farmerName}}'}</code>
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{farmName}}'}</code>
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{email}}'}</code>
                  </div>
                  <div className="space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{demoDate}}'}</code>
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{demoTime}}'}</code>
                    <code className="bg-gray-100 px-2 py-1 rounded">{'{{meetingLink}}'}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
