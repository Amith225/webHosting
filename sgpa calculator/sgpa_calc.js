var credit = [4, 3, 3, 3, 3, 3, 2, 1];

function gradePoint(mark) {
  if (mark >= 90) {return 10}
  else if (mark >= 80) {return 9}
  else if (mark >= 70) {return 8}
  else if (mark >= 60) {return 7}
  else if (mark >= 50) {return 6}
  else if (mark >= 40) {return 4}
  else {return 0}
}


function validate() {
  var ma = document.getElementById("i1").value;
  var py = document.getElementById("i2").value;
  var el = document.getElementById("i3").value;
  var ca = document.getElementById("i4").value;
  var ci = document.getElementById("i5").value;
  var pl = document.getElementById("i6").value;
  var en = document.getElementById("i7").value;
  var dt = document.getElementById("i8").value;
  var marks = [ma, py, el, ca, ci, pl, en, dt];

  gp = 0;
  cd = 0;
  for (var i = 0; i < marks.length; i++) {
  c = credit[i];
  m = marks[i];
  cd += c;
  gp += c * gradePoint(m * 2);
  }
  var sgpa = gp / cd;

  alert("Your SGPA is: " + sgpa.toString());
}