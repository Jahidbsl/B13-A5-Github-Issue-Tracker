
const manageSpinner = (status) => {
    const spinner = document.getElementById("spinner");
    const container = document.getElementById("cardContainer");
    if (status) {
        spinner.classList.remove("hidden");
        container.classList.add("hidden");
    } else {
        spinner.classList.add("hidden");
        container.classList.remove("hidden");
    }
}
const updateTitleCount = (count) => {
    document.getElementById("count").innerText = `${count} Issues`;
}
const toggleStyle = (id) => {
    manageSpinner(true)
    let filterData = [];
    const btns = document.querySelectorAll(".toggleBtn");
    btns.forEach(btn => {
        btn.classList.remove("btn-primary");
        const selectedBtn = document.getElementById(id);
        if (selectedBtn) {
            selectedBtn.classList.add("btn-primary");
        }
        if (id === "all") {
            filteredData = allIssues;

        } else {
            filteredData = allIssues.filter(ele => ele.status === id);

        }
        updateTitleCount(filteredData.length);
        displyAll(filteredData);
    });
    
}

const loadWordDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    // console.log(details)
    showWordDetails(details.data)

}
const showWordDetails = (ele) => {
    const detailContainer = document.getElementById("detailContainer");
    const priorityCls = ele.priority === "high" ? "text-red-600 bg-red-50 border-red-100" : "text-yellow-600 bg-yellow-50 border-yellow-100";
    const labels = ele.labels.map((label, index) => {
        const colorCls = ele.labels.length === 1 ? "bg-green-100 text-green-600" : (index === 0 ? "bg-red-100 text-red-500" : "bg-yellow-100 text-yellow-600");
        return `<p class="${colorCls} px-3 py-1 rounded-full text-[10px] font-bold uppercase border">${label}</p>`;
    }).join('');
    detailContainer.innerHTML = `
    <div class=" md:p-1 max-w-3xl mx-auto my-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
                        <h2 class="text-xl md:text-2xl font-bold text-base-content">${ele.title}</h2>

                    </div>

                    <div class="flex items-center gap-3 mb-6 text-sm text-gray-500 border-b border-dashed pb-4">
                        <div class="badge badge-success gap-2 py-3 px-4 font-semibold uppercase text-[10px] text-white">

                            ${ele.status}
                        </div>
                        <ul class="flex flex-wrap gap-x-4 gap-y-1 p-0 m-0">
                            <li>•</li>
                            <li class="font-medium text-base-content">${ele.author}</li>
                            <li>•</li>
                            <li>${ele.createdAt ? new Date(ele.createdAt).toLocaleDateString() : 'No Date'}</li>
                        </ul>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-6">
                       ${labels}
                    </div>

                    <div class="bg-base-100 p-4 rounded-lg mb-8 border-l-4 border-primary">
                        <p class="text-gray-700 leading-relaxed italic">
                            "${ele.description}"
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-base-200">
                        <div class="flex items-center gap-3">
                            <p class="text-xs uppercase tracking-wider text-gray-400 font-bold">Assignee:</p>
                            <p class="text-sm font-semibold bg-base-200 px-3 py-1 rounded-full">${ele.author}</p>
                        </div>
                        <div class="flex items-center gap-3 sm:justify-end">
                            <p class="text-xs uppercase tracking-wider text-gray-400 font-bold">Priority:</p>
                            <p
                                class="text-sm font-bold ${priorityCls} bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                ${ele.priority}</p>
                        </div>
                        
              
                    </div>
                      <div class="flex justify-end items-end mt-4">
                <form method="dialog">
                    <button class="btn bg-blue-600 hover:bg-blue-700 rounded-sm text-white border-none px-10 shadow-lg">
                        Close
                    </button>
                </form>
            </div>
                </div>
    `;
    document.getElementById("issue_modal").showModal()
    
}
const displyAll = (datas) => {

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    datas.forEach(ele => {
        // console.log(ele)
        const statusColor = ele.status === "open" ? "border-green-600" : "border-purple-600";
        const statusImg = ele.status === "open"
            ? '<img src="./assets/Open-Status.png" alt="Open">'
            : '<img src="./assets/Closed- Status .png" alt="closed">';


        const priorityCls = ele.priority === "high"
            ? "bg-[#FEECEC] text-red-500"
            : "bg-[#FFF6D1] text-[#F59E0B]";


        const labels = ele.labels.map((label, index) => {
            let = colorCls = ""
            if (ele.labels.length === 1) {
                colorCls = "bg-green-100 text-green-600";
            } else {
                colorCls = index === 0 ? "bg-[#FEECEC] text-red-500" : "bg-[#FDE68A] text-[#D97706]";
            }

            return `<p class="${colorCls} px-2 rounded-2xl text-center text-[10px] font-medium uppercase">${label}</p>`;
        }).join('');
        const card = `
          <div onclick="loadWordDetails(${ele.id})" class="card bg-base-100 w-full mt-4 md:mt-8 shadow-sm rounded-sm border-t-4 ${statusColor}">
    
          <div class="flex justify-between items-center p-3">
          <div class="shrink-0">${statusImg}</div>
          <p class="${priorityCls} px-2 py-1 min-w-[70px] rounded-2xl text-center text-[10px] font-bold uppercase">
            ${ele.priority}
          </p>
          </div>

         <div class="card-body p-4 border-b-2 border-base-200">
         <h2 class="card-title text-sm font-bold line-clamp-1">${ele.title}</h2>
         <p class="text-xs opacity-70 line-clamp-2 h-8">${ele.description}</p>
         <div class="card-actions justify-start gap-1 mt-2">
            ${labels}
         </div>
         </div>

         <div class="card-body p-4 flex-col gap-1 text-xs opacity-60">
         <p class="font-semibold truncate">#${ele.id} by ${ele.author}</p>
        <p>${ele.createdAt ? new Date(ele.createdAt).toLocaleDateString() : 'No Date'}</p>
        </div>
        </div>
            `;

        cardContainer.innerHTML += card;
        manageSpinner(false)
    });

}
loadIssue = async () => {
    manageSpinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const allDatas = await res.json();
    allIssues = allDatas.data;
    displyAll(allIssues)
    // console.log(allIssues)
    updateTitleCount(allIssues.length, "Issues");
    manageSpinner(false);
}


loadIssue();
