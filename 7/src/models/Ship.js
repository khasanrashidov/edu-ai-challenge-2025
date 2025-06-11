export class Ship {
    constructor(locations = [], length = 3) {
        this.locations = locations;
        this.hits = new Array(length).fill('');
    }

    isSunk() {
        return this.hits.every(hit => hit === 'hit');
    }

    hit(position) {
        const index = this.locations.indexOf(position);
        if (index >= 0) {
            this.hits[index] = 'hit';
            return true;
        }
        return false;
    }

    isHitAt(position) {
        const index = this.locations.indexOf(position);
        return index >= 0 && this.hits[index] === 'hit';
    }
} 