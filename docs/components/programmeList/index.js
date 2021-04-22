class ProgrammeList extends HTMLElement {

    constructor() {
        super();

        this.innerHTML = `<div class="container">
                              <h2 class="mb-4">Sélectionner une thématique</h2>
                              </hr>
                              <h4 class="mb-4">Je sélectionne dans la liste ci-dessous le besoin prioritaire auquel répond ma solution</h4>
                              <div id="programmeList"></div>
                          </div>`

        this.fetchProgrammeList();
    }

    displayProgrammeList = ({ programmeListCheckboxs }) => {

        // const collectifList = ['collectif_technologique', 'collectif_sectoriel'];

        let res = programmeListCheckboxs.map((programmeListCheckbox) => this.programmeListCheckbox({ programmeListCheckbox })).join('');
        document.getElementById("programmeList").innerHTML = res;
    }

    programmeListCheckbox = ({ programmeListCheckbox }) => {

        const content = `</hr>
                         <div class="row" style="height: 10%">  
                            <input name="eventDemandesReferencement" class="btn-primary col-2" type="checkbox" id="${programmeListCheckbox.id_cycle_lang}" value="${programmeListCheckbox.id_cycle_lang}"></input>
                            <img src="https://www.mlg-consulting.com/manager_cc/docs/archives/${programmeListCheckbox.logo}" class="col-2" style="width: 70%"></img>
                            <label for="eventDemandesReferencement}" class="col-8">${programmeListCheckbox.programm_title}</label>
                         </div>`;

        return content;
    }

    fetchProgrammeList = async () => {

        const req = `getDemandesReferencement`;

        await fetch(`https://www.mlg-consulting.com/smart_territory/form/api.php?action=${req}`)
            .then(res => res.json())
            .then(programmeList => {
                this.displayProgrammeList({ programmeListCheckboxs : programmeList });
            })
    }
}

customElements.define('programme-list', ProgrammeList);
