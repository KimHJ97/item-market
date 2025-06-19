export enum ManagerStatus {
  // 활성화 (정상)
  ACTIVE = 'ACTIVE',

  // 비활성화 (비정상, 휴먼)
  INACTIVE = 'INACTIVE',

  // 잠김 (비밀번호 틀림)
  LOCKED = 'LOCKED',
}
