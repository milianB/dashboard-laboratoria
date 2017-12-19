/*
 * Funcionalidad de tu producto
 */
 function setGenerations(valor)
 {
   //Selecciona el valor del elemento seleccionado
   var selectedIndex = document.getElementById("select-sede").selectedIndex;
   //Elemento que corresponde a la opción seleccionada
   var option = document.getElementById("select-sede")[selectedIndex];
   //Apunta al nombre de la SEDE seleccionada
   var sede = option.dataset.sede;
   var activeStudents = 0;//Variable que almacena a las estudiantes activas (true)
   var desertionStudentsRate = 0; // Variable para guardar el porcentaje de deserción
   var desertedStudents = 0; // Variable para guardar el número de estudiantes que desertaron
   var generation = option.dataset.generation;//Apunta al nombre de la GENERACIÓN seleccionada
   var sprintScoreTech = 0;//Variable que almacena la sumatoria de los punto Tech de cada sprint
   var sprintScoreHSE = 0;//Variable que almacena la sumatoria de los punto HSE de cada sprint
   var goal70Percent = (1800+1200)/2*.7; // 70% del promedio de Sprints Tech & HSE
   var goal70PercentTech = 1800*.7; // 70% del promedio de Sprints Tech
   var goal70PercentHSE = 1200*.7; // 70% del promedio de Sprints HSE
   var averageSprints = 0; // Promedio de puntos por Sprints por estudiante
   var studentsOverAverage = 0; // Estudiantes que superan el promedio del 70% por Sprint
   var studentsOverAverageRate = 0; //% Estudiantes que superan el promedio del 70% por Sprint
   var totalStudents = 0;//Total de estudiantes por sede (true + false)
   var totalPromotors = 0; //Almacena suma total de los puntos de promotores por generación
   var totalDetractors = 0;//Almacena suma total de los puntos de detractores por generación
   var numSprints = 0; //Almacena el número de sprints por generación
   var nps = 0; //NPS
   var totalScoreTech = 0; //Almacena número de estudiantes que superan la meta tech
   var totalScoreHSE = 0; //Almacena número de estudiantes que superan la meta HSE
   var averageSprintsTech = 0; //Almacena promedio tec >= 70%
   var averageSprintsHSE = 0; //Almacena promedio hse >= 70%
   var studentsOverAverageTech = 0; //Almacena total de estudiantes que superan el 70% tech
   var studentsOverAverageHSE = 0; //Almacena total de estudiantes que superan el 70% hse
   var scoreRateTech = 0; //Almacena el % de estudiantes que superan la meta tech
   var scoreRateHSE = 0; //Almacena el % de estudiantes que superan la meta HSE
   var studentsOverAverageTechPerSprint = 0;
   var studentsOverAverageHSEPerSprint = 0;
   var totalCumple = 0; //Alumnas satisfechas
   var totalSupera = 0; //Alumnas más satisfechas
   var averageSatisfaction = 0; //Total de satisfacción
   var totalTeacher = 0; //Almacena la sumatoria de los Teacher
   var totalJedi = 0; //Almacena la sumatoria de los Jedi
   var averageTeacher = 0; //Almacena promedio Teacher
   var averageJedi = 0; //Almacena promedio Jedi
   var studentsOverAverageTechHSE = 0; //PASARON 70% SPRINT PROMEDIO

   //Recorrer a las estudiantes de la data y encontrar a todas las active == true
   for(var i=0; i<data[sede][generation]['students'].length; i++){
     if(data[sede][generation]['students'][i].active == true ){
       activeStudents++;
     }
     else{
       desertedStudents++;
     }
   }
   totalStudents = activeStudents + desertedStudents;
   //Calculando porcentaje de deserción --2
   desertionStudentsRate = desertedStudents/(desertedStudents+activeStudents)*100;//--2
     //Calculando % y # de estudiantes que superan la meta tech & hse
     for(var i=0; i<data[sede][generation]['students'].length; i++){
       for(var j=0; j<data[sede][generation]['students'][i]['sprints'].length; j++){
         totalScoreTech+=data[sede][generation]['students'][i]['sprints'][j].score.tech;
         totalScoreHSE+=data[sede][generation]['students'][i]['sprints'][j].score.hse;
         if(data[sede][generation]['students'][i]['sprints'][j].score.tech>=goal70PercentTech){
         //acumular número de estudiantes por sprint de la clasificación Tech
           studentsOverAverageTechPerSprint++;
         }
         if(data[sede][generation]['students'][i]['sprints'][j].score.hse>=goal70PercentHSE){
         //acumular número de Estudiantes por sprint de la clasificación HSE
           studentsOverAverageHSEPerSprint++;
         }
       //console.log("Estudiantes que superaron la meta del sprint "+(j+1)+" en Tech: "+studentsOverAverageTechPerSprint+"\nEstudiantes que superaron la meta del sprint "+(j+1)+" en HSE: "+studentsOverAverageHSEPerSprint);
       }
       averageSprintsTech = totalScoreTech/data[sede][generation]['students'][i]['sprints'].length;
       averageSprintsHSE = totalScoreHSE/data[sede][generation]['students'][i]['sprints'].length;
       if(averageSprintsTech>=goal70PercentTech && averageSprintsHSE>=goal70PercentHSE){
         studentsOverAverageTechHSE++;
       }
       totalScoreTech = 0;
       totalScoreHSE = 0;
     }
     studentsOverAverageRate = studentsOverAverageTechHSE/totalStudents*100; //---4 el bueno

 //Calculando el NPS
   for(var i = 0; i < data[sede][generation]['ratings'].length; i++){
     totalPromotors += data[sede][generation]['ratings'][i].nps.promoters;
     totalDetractors += data[sede][generation]['ratings'][i].nps.detractors
   }
   numSprints = data[sede][generation]['ratings'].length;
   nps = (totalPromotors - totalDetractors)/numSprints; //--5

 //Calculando # y % de alumnas que superan el 70% Tech y HSE
 for(var i=0; i<data[sede][generation]['students'].length; i++){
     for(var j=0; j<data[sede][generation]['students'][i]['sprints'].length; j++){
       totalScoreTech+=data[sede][generation]['students'][i]['sprints'][j].score.tech;
       totalScoreHSE+=data[sede][generation]['students'][i]['sprints'][j].score.hse;
       if(data[sede][generation]['students'][i]['sprints'][j].score.tech>=goal70PercentTech){
         //acumular número de estudiantes por sprint de la clasificación Tech
         studentsOverAverageTechPerSprint++;
       }
       if(data[sede][generation]['students'][i]['sprints'][j].score.hse>=goal70PercentHSE){
         //acumular número de Estudiantes por sprint de la clasificación HSE
         studentsOverAverageHSEPerSprint++;
       }
     }

     averageSprintsTech = totalScoreTech/data[sede][generation]['students'][i]['sprints'].length;
     averageSprintsHSE = totalScoreHSE/data[sede][generation]['students'][i]['sprints'].length;
     if(averageSprintsTech>=goal70PercentTech){
       studentsOverAverageTech++;
     }
     if(averageSprintsHSE>=goal70PercentHSE){
       studentsOverAverageHSE++;
     }
     totalScoreTech = 0;
     totalScoreHSE = 0;
   }

   //Calcular Porcentaje de estudiantes satisfechas con la experiencia Laboratoria
   //Calculando el NPS
   for(var i = 0; i < data[sede][generation]['ratings'].length; i++){
     totalCumple += data[sede][generation]['ratings'][i].student.cumple;
     totalSupera += data[sede][generation]['ratings'][i].student.supera;
   }
   numSprints = data[sede][generation]['ratings'].length;
   averageSatisfaction = (totalCumple + totalSupera)/numSprints; //--8

   //La puntuación promedio de l@s profesores.
   for(var i = 0; i < data[sede][generation]['ratings'].length; i++){
     totalTeacher += data[sede][generation]['ratings'][i].teacher;
   }
   numSprints = data[sede][generation]['ratings'].length;
   averageTeacher = totalTeacher/numSprints; //--9

   //La puntuación promedio de l@s jedi masters
   for(var i = 0; i < data[sede][generation]['ratings'].length; i++){
     totalJedi += data[sede][generation]['ratings'][i].jedi;
   }
   numSprints = data[sede][generation]['ratings'].length;
   averageJedi = totalJedi/numSprints; //--10

   //------Imprimte todos los resultados que se piden en el ejercico------\\

   console.log("Activas: "+activeStudents+"\nPorcentaje de deserción: "+desertionStudentsRate.toFixed(2)+"% "+"\nEstudiantes sobre el 70% del total de puntos en HSE y Tech: "+ studentsOverAverageTechHSE + "\nPorcentaje de estudiantes que superan el 70% del total de puntos en HSE y Tech: "+studentsOverAverageRate.toFixed(2) + "%" + "\nNPS = " + nps.toFixed(2) + "\nNúmero estudiantes superan 70% de Tech: "+ studentsOverAverageTech + "\nNúmero estudiantes superan 70% de HSE: "+ studentsOverAverageHSE + "\nAlumnas Satisfechas: " + averageSatisfaction.toFixed(2) + "%" + "\nPuntos Teacher: " + averageTeacher.toFixed(2) + "\nPuntos Jedi: " + averageJedi.toFixed(2));
 }
// Puedes hacer uso de la base de datos a través de la variable `data`
