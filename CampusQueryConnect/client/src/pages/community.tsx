import { Layout } from "@/components/layout";
import { UserBadge } from "@/components/user-badge";
import { users } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Community() {
  const allUsers = Object.values(users);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Community Leaders</h1>
        <p className="text-muted-foreground">Top contributors helping students succeed.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden border-border/60 hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex items-center p-6 gap-4">
                <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <div className="flex gap-1">
                      {user.badges.map(b => <UserBadge key={b} level={b} />)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Year {user.year} • {user.bio}</p>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground">{user.questionsAnswered}</span>
                      <span className="text-muted-foreground text-xs uppercase tracking-wide">Answers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground">{user.questionsPending}</span>
                      <span className="text-muted-foreground text-xs uppercase tracking-wide">Asking</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
