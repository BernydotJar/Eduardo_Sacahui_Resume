import { education, certifications, awards } from "@/lib/data";
import EducationTile from "../ui/EducationTile";
import { Award, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Education = () => {
    return (
        <section id="education" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Education & Credentials</h2>
                <p className="mt-4 text-lg text-muted-foreground">My academic background and professional qualifications.</p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-8">
                    {education.map(edu => (
                        <EducationTile key={edu.id} education={edu} />
                    ))}
                </div>

                <Card className="lg:col-span-2">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-primary"/>
                            <span>Certifications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            {certifications.map((cert, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                             <Award className="h-6 w-6 text-primary"/>
                            <span>Awards</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2 text-muted-foreground">
                            {awards.map((award, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span>{award.title} - <span className="font-semibold text-foreground/80">{award.date}</span></span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default Education;
