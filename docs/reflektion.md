# Reflektion - 1DV610, Laboration 2

## Reflektion kapitel 2 - Namngivning
| Namn | Förklaring | Reflektion |
|------|------------|------------|
| `ConvertInput`, `DrawPie`, `StylePie` | Klassnamn på tre moduler som konverterar användarvärden till procent och vinklar, ritar ”pajen”/cirkeln på canvas och sätter de visuella värdena. | Följer inte regeln att undvika verb i klassnamn **Avoid Verbs in Class Names**. Ändras till substantiv. |
| `set warning(value)` | Metodnamn för metod som sätter värdet för ”varning”, den första gränsen i procent då ”pajen”/cirkeln ska ändra färg. | Metodens namn avslöjar inte särskilt mycket. Ett värde för varning ska sättas, men är det en varnings-status, en gräns i siffror eller färgen som ”pajen”/cirkeln ska ändras till som representerar varning?  För att följa regeln **Add Meaningful Context** väljer jag därför att ändra till `set warningBoundary(percent)`.  |
| `addPieBoundaries(warningBoundary, dangerBoundary)` | Metodnamn för metod som sätter gränsvärden för ”warning” och ”danger”. | Här väljer jag att byta ord från `add` till `set` för att undvika missförstånd, **Avoid Disinformation**. Det är inte värden som kommer att adderas vilket man skulle kunna tro, utan här *sätter* man värden för ”warning” och ”danger”. Utan kommentaren till metoden skulle man dessutom inte förstå att gränsvärdena ska anges i procent, vilket bryter mot **Use Intention-Revealing Names**. Trots att namnet blir längre väljer jag att lägga till `percent` för tydlighetens skull så att hela namnet blir `setPieBoundariesInPercent()`. |
| `addSliceColour(colour)` | Metodnamn för metod som sätter färgen på ”pajen”/cirkeln. | Även här ändrar jag från `add` till `set` för att undvika missförstånd **Avoid Desinformation** och följa **One Word Per Concept**. Alla metoder som sätter värden börjar med `set`. |
| `getPieInfo()` | Returnerar information om ”pajens” status (valda färger, gränsvärden,  återstående procent) | Ordet ”Info” säger egentligen inte vad som returneras och kan räknas som ett brusord, vilket bryter mot **Make Meaningful Distinctions**. Därför ändrar jag till `getCurrentStateOfPie()` för att tydligare visa att det är nuvarande tillstånd som returneras. |

Jag försökte tänka på min namngivning redan innan jag påbörjade kodandet. Trots detta blev jag ändå tvungen att refaktorera många av mina metoder efter att ha läst kapitel 2. 

Jag har främst fokuserat på att uppfylla bokens krav kring “Use Intention-Revealing Names”, vilket innebär att metodnamn bland annat ska spegla vad de faktiskt gör. En större refaktorering som jag gjorde var därför bland annat att ändra alla metoder som tidigare hade namn som började på ”add” till ”set”. Metoderna adderar inte till något som man skulle kunna tro, utan sätter ett nytt värde.

Mina metodnamn är nu tydligare och förklarar både syfte och funktion. Jag vill trots det behålla mina JSDoc kommentarer till alla metoder. Personligen uppskattar jag dessa när jag läser någon annans kod och tycker inte att detta påverkar min "readability" negativt.

En annan upptäckt som ställde till problem i min kod var en varierande stavning av ordet färg på engelska, color/colour. Här upptäckte jag vikten av att vara konsekvent i språket.

Jag har försökt att vara noggrann under granskningen av min kod och tycker att jag nu följer många viktiga regler, som att använda namn som går att uttala och söka efter, som inte kräver någon mental mapping och använder inte ord som kan uppfattas som ”cute”. Jag är dessutom konsekvent i mina ordval. 

Sammanfattningsvis förstår jag hur till och med små justeringar i namngivning kan göra stor skillnad för både läsbarheten och förståelsen. En välfungerande funktionalitet går annars lätt förlorad.

En återstående utmaning för mig är dock att hålla namn så enkla och precisa som möjligt. När jag har refaktorerat mina namn har jag inte lyckats göra dessa kortare, utan snarare längre för att var mer självförklarande. Jag tycker dock inte att det gör något i min kod då det har bidragit till att lättare läsa och förstå helheten av min modul.

## Reflektion kapitel 3 - Funktioner
***Tabell här***

Kapitel 3 har fått mig att reflektera mycket kring hur jag strukturerar och skriver mina metoder. Flera regler som “Functions should do one thing”, “Functions should be small” och “One level of abstraction per function” har varit särskilt relevanta då mina metoder många gånger gör för mycket.

Jag har inte heller uppnåt "niladic" i funktionsargument-regeln, utan i de flesta metoder använder jag "dyadic", alltså två argument. Detta anses ju vara helt okej, men jag förstår att det kan göra metoderna svårare att läsa och att det bästa vore att bryta ut funktionalitet ytterligare. 

Det var väldigt nyttigt att läsa och arbeta med kapitel 3. Jag håller med om att koden framförallt kan bli enklare att testa genom att bryta ner metoder, men även lättare att läsa genom att undvika repetitiv kod. Jag kan dock uppleva att jag ibland hellre har allting samlat under en och samma metod för att förstå helheten. För mig kan det ibland krävas mer att läsa och förstå de olika små metoderna, och framför allt minnas vad de gör, än att se validering och logik i ett enda flöde. Jag kan nog helt enkelt tycka att det påverkar läsbarheten negativt istället för att förbättra denna.

Att bryta ner metoder som man redan skapat till mindre metoder tyckte jag dessutom var väldigt svårt. Jag har i alla fall försökt att arbeta med felhantering enligt regeln “Error handling is one thing”. I stället för att enbart kasta fel använder jag även try...catch, vilket gör det möjligt att hantera fel utan att avbryta exekveringen.

## Reflektion - kodkvalitet
Innan jag började skriva kod tog jag mig tid till att bryta ner min modul i mindre delar. Jag skapade en tabell över vilka klasser som behövdes, vilken intern logik de skulle ha och vilka metoder som borde vara publika respektive privata. Det gjorde att jag redan från början kunde tänka på ansvarsfördelning för att uppnå ”high cohesion” samt encapsulation och i och med det low coupling. 

Det visade sig dock bli lite problematiskt med de privata metoderna när det var dags för testning. Jag valde att ändra #drawPie i min huvudklass som ritar om ”pajen” till _drawPie för att kunna testa funktionen i Jest. Detta visar att det är en semi-privat metod, vilket innebär att användaren av modulen förstår att metoden inte ska röras, men är åtkomlig för testning.

Det var trots mina förberedelser inte helt lätt att sätta i gång med koden. Jag började med den grundläggande funktionaliteten och att successivt knyta ihop det hela. Jag visste inte riktigt hur jag skulle få ihop det och implementationen har därför tagit tid. Jag var tvungen att följa tutorials på YouTube och MDN för att förstå hur jag skulle kunna rita upp "pajen" på canvas och beräkna vinklar. Jag har inte kopierat kod rakt av, men det var svårt att inte göra på liknande sätt. Jag läste kapitel 2 och 3 efter att mycket kod redan var på plats och insåg först då att det finns en del att förbättra, bland annat att bryta ner metoder i mindre delar. Detta gjorde det i sin problematiskt då jag blev tvungen att även uppdatera mina tester.

Jag tycker att jag alltid har varit noggrann när jag programmerat, både när det kommer till namnval och funktionalitet. Men jag har förstått nu att hög kodkvalitet är svår att uppnå med detsamma. Att bland annat hålla en abstraktionsnivå per metod är inte helt lätt. Mitt påbörjade arbete att refaktorera och förbättra min kod fortsätter och för varje ändring ökar min förståelse för koden. 

Jag var för övrigt säker på att jag kunde använda pie-meter som namn på mitt npm-package, men upptäckte sent att det redan var upptaget. Därför bestämde jag mig för att ändra namn till **pie-render**. Det är, enligt min mening, ett mycket bättre namn. Namnet beskriver både vad det är, en "paj"/cirkel samt vad den gör, "renderar denna". 

Under denna uppgift har jag också blivit bättre på att arbeta i brancher och förstå hur man håller main ren. Att merga brancher i brancher har hjälpt mig att testa ny funktionalitet utan att störa huvudkoden. Detta gör att jag kan testa tidigare än jag har gjort då jag annars hunnit skriva mycket funktionalitet som jag i huvudet tänkt ska fungera korrekt.