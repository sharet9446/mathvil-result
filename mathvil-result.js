// 전역 변수로 데이터 저장
let assessmentData = null;
let barChartInstance;

// 백엔드에서 데이터를 받아오는 함수 (실제 구현 시 API 호출)
async function fetchAssessmentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = [
        { number: 1, totalPoints: 7, obtainedPoints: 0 },
        { number: 2, totalPoints: 6, obtainedPoints: 0 },
        { number: 3, totalPoints: 7, obtainedPoints: 0 },
        { number: 4, totalPoints: 7, obtainedPoints: 3 },
        { number: 5, totalPoints: 7, obtainedPoints: 0 },
        { number: 6, totalPoints: 7, obtainedPoints: 0 },
        { number: 7, totalPoints: 7, obtainedPoints: 0 },
        { number: 8, totalPoints: 7, obtainedPoints: 7 },
        { number: 9, totalPoints: 6, obtainedPoints: 6 },
        { number: 10, totalPoints: 6, obtainedPoints: 6 },
        { number: 11, totalPoints: 7, obtainedPoints: 7 },
        { number: 12, totalPoints: 6, obtainedPoints: 6 },
        { number: 13, totalPoints: 7, obtainedPoints: 7 },
        { number: 14, totalPoints: 6, obtainedPoints: 6 },
        { number: 15, totalPoints: 7, obtainedPoints: 7 },
      ];

      const totalScore = questions.reduce(
        (acc, q) => acc + q.obtainedPoints,
        0
      );

      resolve({
        student: {
          age: "6세",
          difficultyLevel: "사고력",
        },
        score: {
          total: totalScore,
          maxScore: 100,
          title: "조금 아쉽지만 칭찬받을 수 있는 점수입니다.",
          description:
            "수학의 기본이 잘 되어 있으며, 응용 문제도 잘 풀고 있습니다. 체계적인 사고력 수학 학습을 통해 더 높은 수준으로 도약해 보세요. 꾸준히 노력하는 당신은 곧 큰 성과를 이룰 수 있을 거예요. 더 많은 연습과 복습을 통해 자신감을 키워보세요!",
        },
        questions, // 변수 이름과 key가 같을 때 단축 표현 가능
        units: [
          { name: "수와 연산", total: 20, score: 0, average: 45 },
          { name: "도형과 측정", total: 26, score: 19.5, average: 43 },
          { name: "변화와 관계", total: 24.5, score: 6, average: 37 },
          { name: "자료와 가능성", total: 29.5, score: 29.5, average: 34 },
        ],
        skills: [
          { name: "수리", score: 5, average: 49 },
          { name: "논리독해", score: 73, average: 39 },
          { name: "카운팅", score: 100, average: 30 },
          { name: "공간", score: 68, average: 41 },
          { name: "추리", score: 20, average: 42 },
        ],
        descriptions: [
          {
            title: "수리",
            content:
              "숫자의 이름과 순서를 이해하고, 수를 세고 비교하는 능력을 길러야 합니다. 기본적인 덧셈과 뺄셈을 통해 수의 관계를 이해하는 것도 중요합니다.",
          },
          {
            title: "논리 독해",
            content:
              "다양한 모양을 인식하고 구별할 수 있어야 하며, 공간의 관계를 이해하는 능력을 키워야 합니다. 도형의 위치나 방향을 이해하고 설명할 수 있어야 합니다.",
          },
          {
            title: "카운팅",
            content:
              "반복되는 패턴을 인식하고 이를 설명할 수 있어야 하며, 간단한 등식과 부등식을 이해하는 능력을 길러야 합니다.",
          },
          {
            title: "공간",
            content:
              "간단한 방법으로 데이터를 모으고 정리하는 능력을 배워야 합니다. 또한 기본적인 그래프와 표를 보고 해석할 수 있어야 합니다.",
          },
          {
            title: "추리",
            content:
              "단순한 정보를 받아들이는 것에 그치지 않고, 이를 창의적으로 활용하고 표현하는 능력입니다.",
          },
        ],
      });
    }, 1000);
  });
}

// 헤더 정보 업데이트
function updateHeader(data) {
  document.getElementById("difficultyLevel").textContent =
    data.student.difficultyLevel;
  document.getElementById("studentAge").textContent = data.student.age;
}

// 점수 섹션 업데이트
function updateScoreSection(data) {
  document.getElementById("totalScore").textContent = data.score.total;
  document.getElementById("scoreTitle").textContent = data.score.title;
  document.getElementById("scoreDescription").textContent =
    data.score.description;
}

// 문항별 득점 표 생성
function createQuestionTables(questions) {
  const container = document.getElementById("questionTables");
  container.innerHTML = "";

  // 6문항씩 그룹으로 나누기
  const questionsPerTable = 6;
  const totalTables = Math.ceil(questions.length / questionsPerTable);

  for (let tableIndex = 0; tableIndex < totalTables; tableIndex++) {
    const startIndex = tableIndex * questionsPerTable;
    const endIndex = Math.min(startIndex + questionsPerTable, questions.length);
    const tableQuestions = questions.slice(startIndex, endIndex);

    const table = document.createElement("table");
    table.className = "question-table";

    // 번호 행
    const numberRow = document.createElement("tr");
    numberRow.className = "question-header";
    numberRow.innerHTML = `<td class="row-header">번호</td>`;
    tableQuestions.forEach((q) => {
      numberRow.innerHTML += `<td><span class="question-number">${q.number}</span></td>`;
    });
    table.appendChild(numberRow);

    // 배점 행
    const totalPointsRow = document.createElement("tr");
    totalPointsRow.innerHTML = `<td class="row-header">배점</td>`;
    tableQuestions.forEach((q) => {
      totalPointsRow.innerHTML += `<td class="total-points">${q.totalPoints}</td>`;
    });
    table.appendChild(totalPointsRow);

    // 득점 행
    const obtainedPointsRow = document.createElement("tr");
    obtainedPointsRow.innerHTML = `<td class="row-header">득점</td>`;
    tableQuestions.forEach((q) => {
      const className =
        q.obtainedPoints === q.totalPoints
          ? "obtained-points correct"
          : "obtained-points";
      obtainedPointsRow.innerHTML += `<td class="${className}">${q.obtainedPoints}</td>`;
    });
    table.appendChild(obtainedPointsRow);

    container.appendChild(table);
  }
}

// 영역별 분석 표 생성
function createAnalysisTable(units) {
  const tbody = clearTbody("analysisTableBody");

  let totalScore = 0;
  let totalMax = 0;

  units.forEach((unit, index) => {
    const percentage =
      unit.total > 0 ? Math.round((unit.score / unit.total) * 100) : 0;

    appendRow(
      tbody,
      `
            <td class="unit-names"><span class=unit-number>${
              index + 1
            }</span><span class="unit-name">${unit.name}</span></td>
            <td class="cell-total">${unit.total}</td>
            <td class="cell-score">${unit.score}</td>
            <td class="cell-percentage">${percentage}%</td>
            <td class="cell-average">${unit.average}%</td>
        `
    );
    totalScore += unit.score;
    totalMax += unit.total;
  });

  // 총계 행 추가
  const totalPercentage =
    totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const totalRow = document.createElement("tr");
  totalRow.className = "analysis-total";
  totalRow.innerHTML = `
        <td style="font-weight: bold; text-align: center;">계</td>
        <td class="cell-total">${totalMax}</td>
        <td class="cell-score">${totalScore}</td>
        <td class="cell-percentage">${totalPercentage}%</td>
        <td class="cell-average">40%</td>
    `;
  tbody.appendChild(totalRow);
}

// 영재사고력 표 생성
function createSkillsTable(skills) {
  const tbody = clearTbody("skillsTableBody");

  // 나의 점수 행
  const myScoreRow = `
    <td class="skill-name">나의 점수</td>
    ${skills
      .map((skill) => `<td class="skill-percentage-my">${skill.score}%</td>`)
      .join("")}
  `;
  appendRow(tbody, myScoreRow);

  // 평균 점수 행
  const avgScoreRow = `
    <td class="skill-name">평균</td>
    ${skills
      .map((skill) => `<td class="skill-percentage-avg">${skill.average}%</td>`)
      .join("")}
  `;
  appendRow(tbody, avgScoreRow);
}

// 영재사고력 설명 생성
function createDescriptionTable(descriptions) {
  const tbody = clearTbody("descriptionTableBody");

  descriptions.forEach((desc) => {
    appendRow(
      tbody,
      `
            <td class="skill-category">${desc.title}</td>
            <td class="skill-description">${desc.content}</td>
        `
    );
  });
}

// tbody를 비우고 반환하는 함수
function clearTbody(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = "";
  return tbody;
}

// tbody에 행을 추가하는 함수
function appendRow(tbody, htmlString) {
  const row = document.createElement("tr");
  row.innerHTML = htmlString;
  tbody.appendChild(row);
}

// 막대 차트 그리기
function drawBarChart(units) {
  const ctx = document.getElementById("barChart");

  // 기존에 차트가 그려져 있으면 먼저 삭제
  if (barChartInstance) {
    barChartInstance.destroy();
  }

  const label = units.map((unit) => unit.name);
  const myScore = units.map((unit) => unit.score);
  const avgScore = units.map((unit) => unit.average * (unit.total / 100));

  barChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "나의 점수",
          data: myScore,
          backgroundColor: "#ff6b35",
          borderColor: "#ff6b35",
          borderWidth: 1,
          order: 2, // 나의 점수 z-index를 두 번째로 설정
          barThickness: 40, // 막대 두께
        },
        {
          label: "평균",
          data: avgScore,
          type: "line",
          borderColor: "#307df1",
          backgroundColor: "#307df1",
          borderWidth: 2,
          fill: false,
          pointRadius: 0, // 점 표시 안 함
          pointHoverRadius: 4,
          order: 1, // 평균 z-index를 첫 번째로 설정
        },
      ],
    },
    options: {
      responsive: true, // 반응형 차트
      maintainAspectRatio: false, // 차트 크기 자동 조정
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            font: {
              size: 16,
            },
            color: "#666",
            padding: 32,
            sort: (a, b) => {
              const order = ["나의 점수", "평균"];
              return order.indexOf(a.text) - order.indexOf(b.text);
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#666",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial",
            },
          },
        },
        y: {
          grid: {
            display: true,
            color: "rgba(94, 61, 61, 0.1)",
          },
          ticks: {
            color: "#c3c3c3",
            stepSize: 5,
            font: {
              size: 20,
              family: "Arial",
            },
          },
          beginAtZero: true,
          stacked: false,
        },
      },
    },
  });
}

// 레이더 차트 그리기
function drawRadarChart(skills) {
  const ctx = document.getElementById("radarChart");
  ctx.style.backgroundColor = "transparent";

  const label = skills.map((skill) => skill.name);
  const myScore = skills.map((skill) => skill.score);
  const averageScore = skills.map((skill) => skill.average);

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: label,
      datasets: [
        {
          label: "나의 점수",
          data: myScore,
          borderColor: "#ff6b35",
          backgroundColor: "rgba(255, 107, 71, 0.1)",
          pointBackgroundColor: "#ff6b35",
          pointBorderColor: "#ff6b35",
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: "평균",
          data: averageScore,
          borderColor: "#b1c7fe",
          backgroundColor: "rgba(74, 144, 226, 0.1)",
          pointBackgroundColor: "#b1c7fe",
          pointBorderColor: "#b1c7fe",
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "line",
            font: {
              size: 16,
            },
            color: "#666",
            padding: 32,
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 100 / 6,
            display: false,
          },
          grid: {
            color: "#b6b6b6",
            lineWidth: 1,
          },
          angleLines: {
            color: "rgba(200, 200, 200, 0.3)",
            lineWidth: 0,
          },
          pointLabels: {
            font: {
              size: 20,
              family: "PretendardM",
            },
            color: "#666",
            padding: 15,
          },
        },
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          borderWidth: 2,
        },
      },
    },
  });
}

// 모든 데이터를 렌더링하는 함수
function renderAssessmentData(data) {
  assessmentData = data;

  updateHeader(data);
  updateScoreSection(data);
  createQuestionTables(data.questions);
  createAnalysisTable(data.units);
  createSkillsTable(data.skills);
  createDescriptionTable(data.descriptions);

  // 차트는 약간의 지연 후 그리기 (캔버스 크기가 설정된 후)
  setTimeout(() => {
    drawBarChart(data.units);
    drawRadarChart(data.skills);
  }, 100);
}

// 외부에서 데이터를 주입할 수 있는 함수 (백엔드 연동용)
window.loadAssessmentData = function (data) {
  renderAssessmentData(data);
};

// 초기화
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // 백엔드에서 데이터 가져오기
    const data = await fetchAssessmentData();
    renderAssessmentData(data);
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    document.getElementById("scoreTitle").textContent =
      "데이터를 불러올 수 없습니다.";
    document.getElementById("scoreDescription").textContent =
      "잠시 후 다시 시도해주세요.";
  }
});

// 창 크기 변경 시 차트 다시 그리기
window.addEventListener("resize", function () {
  if (assessmentData) {
    setTimeout(() => {
      drawBarChart(assessmentData.units);
      drawRadarChart(assessmentData.skills);
    }, 100);
  }
});
