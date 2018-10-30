export const mockLocationData = {
  data: {
    Location: {
      title: 'Test',
      pickupRides: [
        {
          dropoffRangeEnd: '2018-10-01T19:34:00.000Z',
          id: 'cjm6zjrl70pus0109ks7pfx3d',
          status: 'En Route',
          pickupMember: {
            id: 'asfdjklj324212321',
            firstName: 'Judy',
            lastName: 'Jones',
          },
          route: {
            id: 'cjmpmq3qm0tn3016543mkm5zp',
            shift: {
              id: 'cjmpmq3ql0tn20165bho7xfie',
              vehicles: [
                {
                  id: 'cjmgdp3oz1jfp01836mdqo18g',
                  carName: 'Milo',
                  licensePlate: '3DS123',
                },
              ],
              members: [
                {
                  id: 'cjmgdcldc1q570132sypp4jvf',
                  firstName: 'Jane',
                  lastName: 'Smith',
                },
              ],
            },
          },
          dropoffRangeStart: '2018-10-01T18:54:00.000Z',
          pickupRangeStart: '2018-10-01T18:40:00.000Z',
          pickupRangeEnd: '2018-10-01T18:50:00.000Z',
        },
      ],
      dropOffRides: [
        {
          dropoffRangeEnd: '2018-10-01T11:45:00.000Z',
          id: 'cjl2rp1g70xyv016870o3az2j',
          status: 'Canceled',
          pickupMember: {
            firstName: 'Tommy',
            lastName: 'Jones',
          },
          route: null,
          dropoffRangeStart: '2018-10-01T11:35:00.000Z',
          pickupRangeStart: '2018-10-01T10:50:00.000Z',
          pickupRangeEnd: '2018-10-01T11:30:00.000Z',
        },
        {
          dropoffRangeEnd: '2018-10-01T13:45:00.000Z',
          id: 'cjl2rp1g70xyv016870o3az2j',
          status: 'Completed',
          pickupMember: {
            firstName: 'Test',
            lastName: 'Student',
          },
          route: {
            id: 'asdfsafdasfdsadf',
            shift: {
              id: 'asdfasdfsa233234',
              vehicles: [
                {
                  id: 'asfsdafd23421234231',
                  carName: 'Respy',
                  licensePlate: '832941',
                },
              ],
              members: [
                {
                  id: '12345',
                  firstName: 'Tom',
                  lastName: 'Smith',
                },
              ],
            },
          },
          dropoffRangeStart: '2018-10-01T13:35:00.000Z',
          pickupRangeStart: '2018-10-01T12:50:00.000Z',
          pickupRangeEnd: '2018-10-01T12:30:00.000Z',
        },
        {
          dropoffRangeEnd: '2018-10-01T11:45:00.000Z',
          id: 'cjl5yoh4t1kyu0114boe4toms',
          status: 'Completed',
          pickupMember: {
            firstName: 'Timothy',
            lastName: 'Johnson',
          },
          route: {
            id: 'cjmpjronb0byy0163safo5bus',
            shift: {
              id: 'cjmpjrona0byx0163hl7xfkyt',
              vehicles: [
                {
                  id: 'cjg8cj7vx5xc401046rf3dql7',
                  carName: 'Jessie',
                  licensePlate: '834201',
                },
              ],
              members: [
                {
                  id: '12345',
                  firstName: 'Tom',
                  lastName: 'Smith',
                },
              ],
            },
          },
          dropoffRangeStart: '2018-10-01T11:35:00.000Z',
          pickupRangeStart: '2018-10-01T10:45:00.000Z',
          pickupRangeEnd: '2018-10-01T11:25:00.000Z',
        },
      ],
    },
  },
};

export const mockDriverData = {
  data: {
    allMembers: [
      {
        id: 'cjngger4r0kno0139oytzomac',
        firstName: 'John',
        lastName: 'Allan',
      },
      {
        id: 'cj94y9s2ydqq70127v370a0mh',
        firstName: 'Marc',
        lastName: 'Antony',
      },
      {
        id: 'cj4088v6oajnz0109abb299kt',
        firstName: 'Bruce',
        lastName: 'Barnes',
      },
      {
        id: 'cjdnfvhy1rne101551wv7ucb5',
        firstName: 'Tom',
        lastName: 'Brady',
      },
      {
        id: 'cjnaici7g0oai0157rdoo3wvu',
        firstName: 'Julio',
        lastName: 'Cesar',
      },
      {
        id: 'cjm6epkpa2pm80127r28wnp3y',
        firstName: 'Winston ',
        lastName: 'Churchill',
      },
      {
        id: 'cjlid6veu01fx01151xlfftag',
        firstName: 'Nick',
        lastName: 'Cook',
      },
      {
        id: 'cjmge3dsu1y1u0117klcijftz',
        firstName: 'Henry',
        lastName: 'Johnson',
      },
      {
        id: 'cjm9vxw1k139j0126saiatclo',
        firstName: 'Jane',
        lastName: 'Johnson',
      },
      {
        id: 'cje5vra81lb0701186ksjncmv',
        firstName: 'Allan',
        lastName: 'Jones',
      },
      {
        id: 'cjm9aft6t06240166wmb6k6ko',
        firstName: 'David',
        lastName: 'Ortiz',
      },
      {
        id: 'cjmgdcldc1q570132sypp4jvf',
        firstName: 'Will',
        lastName: 'Smith',
      },
      {
        id: 'cjmt9x0ou1pz90124rkhs9het',
        firstName: 'Rex',
        lastName: 'Tillerson',
      },
    ],
  },
};

export const mockNotesData = {
  data: {
    Location: {
      pickupNotes:
        'If you arrive by 2:30PM, go directly up the hill via Manet Rd. After 2:30PM, wait in the line of cars at the bottom of the hill. Staff member will be stationed on the way with students',
      dropOffNotes:
        'Pull onto Manet Road and up the hill - staff member will be stationed on the way with students. For morning drop offs ARRIVING after 7:55AM, walk students through main entrance and sign them off as tardy',
    },
  },
};
