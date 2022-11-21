export function getAccess(){
  const ACCOUNT_KEY = 'currentAccess';
  return localStorage.getItem(ACCOUNT_KEY);
}

export function getRefresh(){
  const ACCOUNT_KEY = 'currentRefresh';
  return localStorage.getItem(ACCOUNT_KEY);
}
export function setAccess(token: string){
  const ACCOUNT_KEY = 'currentAccess';
  localStorage.setItem(ACCOUNT_KEY, token);
}

export function setRefresh(token: string){
  const ACCOUNT_KEY = 'currentRefresh';
  localStorage.setItem(ACCOUNT_KEY, token);
}
export function setAccount(account: string){
  const ACCOUNT_KEY = 'ACCOUNT-NEW';
  localStorage.setItem(ACCOUNT_KEY, account);
}

export function getAccount(){
  const ACCOUNT_KEY = 'ACCOUNT-NEW';
  return localStorage.getItem(ACCOUNT_KEY);
}

