import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <Layout>
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">About CampusConnect</h1>
        
        <div className="prose prose-lg dark:prose-invert text-muted-foreground">
          <p className="lead text-xl text-foreground mb-6">
            We are a student-led initiative designed to bridge the gap between academic years.
          </p>
          
          <p className="mb-4">
            CampusConnect operates on a simple premise: <strong>Knowledge flows from experience.</strong>
          </p>

          <Card className="my-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2">How it works</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                <li>1st Year students ask questions about courses, campus life, and academics.</li>
                <li>Senior students (2nd-4th year) provide guidance and answers.</li>
                <li>Quality answers are rated by the community, earning badges for contributors.</li>
              </ul>
            </CardContent>
          </Card>

          <p>
            Our goal is to ensure no student feels lost during their academic journey. Whether it's finding the right textbook or understanding complex theories, the community is here to help.
          </p>
        </div>
      </div>
    </Layout>
  );
}
