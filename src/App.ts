import { StudentData, StudentWork } from "./Types";

export class App {
  public async init(): Promise<void> {
    const teasersSection: HTMLElement | null =
      document.querySelector(".teasers");

    if (teasersSection) {
      const json = await this.fetchData();

      if (json) {
        const randomizedStudentWork = this.shuffleArray(json.data);

        randomizedStudentWork.forEach((studentWork) => {
          const teaserCard: HTMLDivElement = this.createTeaserCard(studentWork);
          teasersSection.append(teaserCard);
        });
      }
    }
  }

  private async fetchData(): Promise<StudentData | null> {
    try {
      const response = await fetch("./data.json");
      const data: StudentData = await response.json();
      return data;
    } catch (error: any) {
      console.log(`Erreur lors de la récupération des données : ${error}`);
      return null;
    }
  }

  private shuffleArray(data: StudentWork[]) {
    let currentIndex = data.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }

    return data;
  }

  private createTeaserCard(studentWork: StudentWork): HTMLDivElement {
    const card = document.createElement("div");
    const name = document.createElement("h3");
    const type = document.createElement("span");
    const gitLink = document.createElement("a");
    const siteLink = document.createElement("a");
    const gifImage = document.createElement("div");

    card.classList.add("teaser");

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title_wrapper");

    const nameWrapper = document.createElement("div");
    nameWrapper.classList.add("name_wrapper");

    const gifWrapper = document.createElement("div");
    gifWrapper.classList.add("gif_wrapper");

    name.innerText = studentWork.name;

    type.innerText = studentWork.type;

    gitLink.href = studentWork.git_url;
    gitLink.innerHTML = this.createGitIcon();
    gitLink.setAttribute("target", "_blank");
    gitLink.setAttribute("title", "Consulter le dépôt Github du projet");

    siteLink.href = studentWork.site_url;
    siteLink.innerHTML = this.createGameIcon();
    siteLink.setAttribute("target", "_blank");

    gifImage.style.backgroundImage = `url(${studentWork.img_path})`;

    nameWrapper.append(name, type);
    titleWrapper.append(gitLink, nameWrapper);
    gifWrapper.append(gifImage, siteLink);
    card.append(titleWrapper, gifWrapper);

    return card;
  }

  private createGameIcon(): string {
    return 'Jouer <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"></path></svg>';
  }

  private createGitIcon(): string {
    return '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>';
  }
}
